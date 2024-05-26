const isRelativeUrl = (url) =>
    url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
  
  const normalizeUrl = (url) => {
    if (!isRelativeUrl(url)) {
      return url;
    }
  
    const relativePath = isRelativeUrl(url) ? url : `/${url}`;
  
    if (process.env.NODE_ENV === 'production') {
      return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${relativePath}`;
    }
  
    return `http://localhost:3000${relativePath}`;
  };
  
  export default normalizeUrl;