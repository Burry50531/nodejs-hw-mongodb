const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return null;

  const allowedTypes = ['work', 'home', 'personal'];
  return allowedTypes.includes(contactType) ? contactType : null;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') return true;
    if (isFavourite.toLowerCase() === 'false') return false;
  }

  if (typeof isFavourite === 'boolean') return isFavourite;

  return null;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    ...(parsedContactType !== null && { contactType: parsedContactType }),
    ...(parsedIsFavourite !== null && { isFavourite: parsedIsFavourite }),
  };
};