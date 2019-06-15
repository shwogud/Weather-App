export const filterSearch = (searchQuery) => {
  let splitString = searchQuery.split(",")
  if (splitString.length === 2) {
    return {
      type: "coordinates",
      lat: splitString[0].trim(),
      lon: splitString[1].trim(),
    }
  } 
  else if (splitString.length === 1) {
    if (isZipCode(splitString[0].trim())) {
      return {
        type: "zip_code",
        zipCode: splitString[0].trim()
      }
    } else {
      return {
        type: "city_name",
        name: splitString[0].trim()
      }
    }
  } 
}

export const truncateTime = (time) => {
  return time.slice(11, 16)
}

const isZipCode = (string) => {
  return !Number.isNaN(parseInt(string))
}