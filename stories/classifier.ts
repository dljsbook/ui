/* globals Promise */

import ImageClassifier from '../src/components/ImageClassifier';
import * as tfvis from '@tensorflow/tfjs-vis';
import {
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'
import * as tf from "@tensorflow/tfjs";
const url = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

type IImage = HTMLImageElement | ImageData | HTMLCanvasElement | HTMLVideoElement;

const oneHot = (labels: number[], classes: number) => tf.tidy(() => tf.oneHot(tf.tensor1d(labels).toInt(), classes));

const crop = (img: tf.Tensor3D) => {
  const size = Math.min(img.shape[0], img.shape[1]);
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

// convert pixel data into a tensor
const processImage = async (img: IImage | string, dims: [number, number]): Promise<tf.Tensor> => {
  if (!img) {
    throw new Error('You must provide an image');
  }
  if (!dims || dims.length !== 2) {
    throw new Error('You must provide valid dimensions by which to process');
  }
  return tf.tidy(() => {
    const pixels = tf.fromPixels(getImage(img));
    const croppedImage = crop(tf.image.resizeBilinear(pixels, dims));
    return croppedImage.expandDims(0).toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  });
};

const getImage = (src: IImage | string): (HTMLImageElement | ImageData | HTMLCanvasElement | HTMLVideoElement) => {
  if (typeof src === 'string') {
    const image = new Image();
    image.src = src;
    return image;
  }
  return src;
}

function activateImages(images: HTMLImageElement[]) {
  return images.reduce((promise, image) => {
    return promise.then(tensor => processImage(image, [224, 224]).then(activatedImage => {
      if (tensor === undefined) {
        return activatedImage
      }
      const concatenatedTensor = tensor.concat(activatedImage)
      tensor.dispose()
      activatedImage.dispose()
      return concatenatedTensor
    }))
  }, Promise.resolve())
}

function imagesToTensors(images) {
  const categories = Object.keys(images)
  return categories.reduce((promise, category, categoryIndex) => {
    return promise.then(tensor => {
      return activateImages(images[category]).then(activatedImages => {
        const oneHotLabels = oneHot(
          Array(activatedImages.shape[0]).fill(categoryIndex),
          categories.length
        )
        if (tensor === undefined) {
          return {
            data: activatedImages,
            labels: oneHotLabels
          }
        }
        const concatenatedTensor = {
          data: tensor.data.concat(activatedImages),
          labels: tensor.labels.concat(oneHotLabels)
        }

        tensor.data.dispose()
        tensor.labels.dispose()
        activatedImages.dispose()
        oneHotLabels.dispose()

        return concatenatedTensor
      })
    })
  }, Promise.resolve());
}

function getPretrainedModel() {
  return tf.loadModel(url).then(mobilenet => {
    const layer = mobilenet.getLayer('conv_pw_13_relu')
    return tf.model({
      inputs: mobilenet.inputs,
      outputs: layer.output,
    })
  })
}

function getModel(mobileNet, numberOfClasses) {
  const layer = mobileNet.getLayer('conv_pw_13_relu')
  const model = tf.sequential({
    layers: [
      tf.layers.flatten({
        inputShape: layer.outputShape.slice(1),
      }),
      tf.layers.dense({
        units: 100, // experiment with this number
        activation: 'relu',
      }),
      tf.layers.dense({
        // set this to however many classes you are predicting upon
        units: numberOfClasses,
        activation: 'softmax',
      })
    ],
  })

  model.compile({
    optimizer: tf.train.adam(0.0001),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  })

  return model
}

const waitForModel = () => new Promise((resolve) => {
  if (model) {
    resolve();
  }

  setTimeout(() => {
    resolve(waitForModel());
  }, 100);
});

let model;
let pretrainedModel;
const component = (target: HTMLElement) => {
  new ImageClassifier(target, {
    actionButtonText: 'Train',
    actionButtonIcon: faGraduationCap,
    onImages: (images: any) => {
      return imagesToTensors(images).then((_data) => {
        console.log('data', _data);
        const {
          data,
          labels,
        } = _data;
        return waitForModel().then(() => {
          const batchLogs = []
          const predictedData = pretrainedModel.predict(data)
          model.fit(predictedData, labels, {
            shuffle: true,
            epochs: 15,
            callbacks: {
              onBatchEnd: (batch, h) => {
                batchLogs.push(h)
                tfvis.show.history(
                  {name: "Loss on Batch End", tab: "Training"},
                  batchLogs,
                  ["loss", "acc"]
                )
              }
            }
          }).then(() => {
            model.save('downloads://image-classification-model')
          });
        });
      });
    },
  });

  getPretrainedModel().then(_pretrainedModel => {
    pretrainedModel = _pretrainedModel;
    model = getModel(pretrainedModel, 2);
  });
}

const classifier = {
  label: 'Image Classifier with training',
  component,
};

export default classifier;
