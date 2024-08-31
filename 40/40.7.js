const createRequestParams = (formData) => 
    '?' + [...formData]
    .reduce((params, [key, value]) => `${params}${params ? '&' : ''}${key}=${value}`, '');