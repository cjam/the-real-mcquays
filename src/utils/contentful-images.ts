import _ from "lodash"
import qs from "qs"

const CONTENTFUL_IMAGE_MAX_SIZE = 4000;

const isImage = (image: any) => _.includes([`image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`], _.get(image, `file.contentType`));

const getBasicImageProps = (image: any, args: { width?: number, height?: number }) => {
  let aspectRatio;

  if (args.width && args.height) {
    aspectRatio = args.width / args.height
  } else {
    aspectRatio = image.file.details.image.width / image.file.details.image.height;
  }

  return {
    baseUrl: image.file.url,
    contentType: image.file.contentType,
    aspectRatio,
    width: image.file.details.image.width,
    height: image.file.details.image.height
  };
};


const createUrl = (imgUrl: string, options: any = {}) => {
  // Convert to Contentful names and filter out undefined/null values.
  const args = _.pickBy({
    w: options.width,
    h: options.height,
    fl: options.jpegProgressive ? `progressive` : null,
    q: options.quality,
    fm: options.toFormat || ``,
    fit: options.resizingBehavior || ``,
    f: options.cropFocus || ``,
    bg: options.background || ``
  }, _.identity);

  return `${imgUrl}?${qs.stringify(args)}`;
};


export const resolveFixed = (image: any, options: any) => {
  if (!isImage(image)) return null;

  const _getBasicImageProps = getBasicImageProps(image, options),
    baseUrl = _getBasicImageProps.baseUrl,
    width = _getBasicImageProps.width,
    aspectRatio = _getBasicImageProps.aspectRatio;

  let desiredAspectRatio = aspectRatio; // If no dimension is given, set a default width

  if (options.width === undefined && options.height === undefined) {
    options.width = 400;
  } // If we're cropping, calculate the specified aspect ratio.


  if (options.width !== undefined && options.height !== undefined) {
    desiredAspectRatio = options.width / options.height;
  } // If the user selected a height and width (so cropping) and fit option
  // is not set, we'll set our defaults


  if (options.width !== undefined && options.height !== undefined) {
    if (!options.resizingBehavior) {
      options.resizingBehavior = `fill`;
    }
  } // Create sizes (in width) for the image. If the width of the
  // image is 800px, the sizes would then be: 800, 1200, 1600,
  // 2400.
  //
  // This is enough sizes to provide close to the optimal image size for every
  // device size / screen resolution


  let fixedSizes = [];
  fixedSizes.push(options.width);
  fixedSizes.push(options.width * 1.5);
  fixedSizes.push(options.width * 2);
  fixedSizes.push(options.width * 3);
  fixedSizes = fixedSizes.map(Math.round); // Filter out sizes larger than the image's width and the contentful image's max size.

  const filteredSizes = fixedSizes.filter(size => {
    const calculatedHeight = Math.round(size / desiredAspectRatio);
    return size <= CONTENTFUL_IMAGE_MAX_SIZE && calculatedHeight <= CONTENTFUL_IMAGE_MAX_SIZE && size <= width;
  }); // Sort sizes for prettiness.

  const sortedSizes = _.sortBy(filteredSizes); // Create the srcSet.


  const srcSet = sortedSizes.map((size, i) => {
    let resolution;

    switch (i) {
      case 0:
        resolution = `1x`;
        break;

      case 1:
        resolution = `1.5x`;
        break;

      case 2:
        resolution = `2x`;
        break;

      case 3:
        resolution = `3x`;
        break;

      default:
    }

    const h = Math.round(size / desiredAspectRatio);
    return `${createUrl(baseUrl, Object.assign({}, options, {
      width: size,
      height: h
    }))} ${resolution}`;
  }).join(`,\n`);
  let pickedHeight, pickedWidth;

  if (options.height) {
    pickedHeight = options.height;
    pickedWidth = options.height * desiredAspectRatio;
  } else {
    pickedHeight = options.width / desiredAspectRatio;
    pickedWidth = options.width;
  }

  return {
    aspectRatio: desiredAspectRatio,
    baseUrl,
    width: Math.round(pickedWidth),
    height: Math.round(pickedHeight),
    src: createUrl(baseUrl, Object.assign({}, options, {
      width: options.width
    })),
    srcSet
  };
};


export const resolveFluid = (image: any, options: any) => {
  if (!isImage(image)) return null;

  const _getBasicImageProps2 = getBasicImageProps(image, options),
    baseUrl = _getBasicImageProps2.baseUrl,
    width = _getBasicImageProps2.width,
    aspectRatio = _getBasicImageProps2.aspectRatio;

  let desiredAspectRatio = aspectRatio; // If no dimension is given, set a default maxWidth

  if (options.maxWidth === undefined && options.maxHeight === undefined) {
    options.maxWidth = 800;
  } // If only a maxHeight is given, calculate the maxWidth based on the height and the aspect ratio


  if (options.maxHeight !== undefined && options.maxWidth === undefined) {
    options.maxWidth = Math.round(options.maxHeight * desiredAspectRatio);
  } // If we're cropping, calculate the specified aspect ratio.


  if (options.maxHeight !== undefined && options.maxWidth !== undefined) {
    desiredAspectRatio = options.maxWidth / options.maxHeight;
  } // If the users didn't set a default sizes, we'll make one.


  if (!options.sizes) {
    options.sizes = `(max-width: ${options.maxWidth}px) 100vw, ${options.maxWidth}px`;
  } // Create sizes (in width) for the image. If the max width of the container
  // for the rendered markdown file is 800px, the sizes would then be: 200,
  // 400, 800, 1200, 1600, 2400.
  //
  // This is enough sizes to provide close to the optimal image size for every
  // device size / screen resolution


  let fluidSizes = [];
  fluidSizes.push(options.maxWidth / 4);
  fluidSizes.push(options.maxWidth / 2);
  fluidSizes.push(options.maxWidth);
  fluidSizes.push(options.maxWidth * 1.5);
  fluidSizes.push(options.maxWidth * 2);
  fluidSizes.push(options.maxWidth * 3);
  fluidSizes = fluidSizes.map(Math.round); // Filter out sizes larger than the image's maxWidth and the contentful image's max size.

  const filteredSizes = fluidSizes.filter(size => {
    const calculatedHeight = Math.round(size / desiredAspectRatio);
    return size <= CONTENTFUL_IMAGE_MAX_SIZE && calculatedHeight <= CONTENTFUL_IMAGE_MAX_SIZE && size <= width;
  }); // Add the original image (if it isn't already in there) to ensure the largest image possible
  // is available for small images.

  if (!filteredSizes.includes(parseInt(width)) && parseInt(width) < CONTENTFUL_IMAGE_MAX_SIZE && Math.round(width / desiredAspectRatio) < CONTENTFUL_IMAGE_MAX_SIZE) {
    filteredSizes.push(width);
  } // Sort sizes for prettiness.


  const sortedSizes = _.sortBy(filteredSizes); // Create the srcSet.


  const srcSet = sortedSizes.map(width => {
    const h = Math.round(width / desiredAspectRatio);
    return `${createUrl(image.file.url, Object.assign({}, options, {
      width,
      height: h
    }))} ${Math.round(width)}w`;
  }).join(`,\n`);
  return {
    aspectRatio: desiredAspectRatio,
    baseUrl,
    src: createUrl(baseUrl, Object.assign({}, options, {
      width: options.maxWidth,
      height: options.maxHeight
    })),
    srcSet,
    sizes: options.sizes
  };
};



export const resolveResize = (image: any, options: any) => {
  // if (!isImage(image)) return null;

  const _getBasicImageProps3 = getBasicImageProps(image, options),
    baseUrl = _getBasicImageProps3.baseUrl,
    aspectRatio = _getBasicImageProps3.aspectRatio; // If no dimension is given, set a default width


  if (options.width === undefined && options.height === undefined) {
    options.width = 400;
  } // If the user selected a height and width (so cropping) and fit option
  // is not set, we'll set our defaults


  if (options.width !== undefined && options.height !== undefined) {
    if (!options.resizingBehavior) {
      options.resizingBehavior = `fill`;
    }
  }

  let pickedHeight = options.height,
    pickedWidth = options.width;

  if (pickedWidth === undefined) {
    pickedWidth = pickedHeight * aspectRatio;
  }

  if (pickedHeight === undefined) {
    pickedHeight = pickedWidth / aspectRatio;
  }
  const src = createUrl(image.file.url, options)

  return {
    src,
    srcSet: src,
    width: Math.round(pickedWidth),
    height: Math.round(pickedHeight),
    aspectRatio,
    baseUrl
  }
}
