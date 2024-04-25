import { useState } from 'react'

export default function useFindCoordinates(searchInfos = []) {
  const [coordinates, setCoordinates] = useState()

  /**
   * Trouve les coordonnées d'un lieu en utilisant les informations fournies dans un array de strings
   *
   * @param {Array} infos - Un tableau d'informations pour lesquelles récupérer les coordonnées.
   * @return {Array} Un tableau contenant les coordonnées du lieu si trouvées, sinon un tableau vide.
   */
  async function fetchCoordinates (infos) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${infos.join(", ")}`
    const response = await fetch(encodeURI(url))
    const data = await response.json()

    return data.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : []
  }

  /**
   * Cherche les coordonnées l'array de strings fourni en paramètre
   *
   * @param {Array} infos - Un tableau de chaînes de caractères contenant les informations pour lesquelles trouver les coordonnées.
   * @return {Promise<void>} Une promesse qui se résout lorsque les informations de recherche sont définies.
   */
  async function setSearchInfos(infos) {
    while (infos.length > 1) {
      const coordinates = await fetchCoordinates(infos)
      if (coordinates.length === 0) {
        infos.shift()
      } else {
        break
      }
    }

    setCoordinates(await fetchCoordinates(infos))
  }

  return [coordinates, setSearchInfos]
}
