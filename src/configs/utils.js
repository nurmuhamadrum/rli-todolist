export const Fonts = {
  Poppins: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsBold: 'Poppins-Bold',
};

export const textEllipsis = (
  str,
  maxLength,
  {side = 'end', ellipsis = '...'} = {},
) => {
  if (str.length > maxLength) {
    switch (side) {
      case 'start':
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case 'end':
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
};
