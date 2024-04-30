import { useState } from 'react'

export default function useFindCoordinates(searchInfos = []) {
  const [coordinates, setCoordinates] = useState<[number, number]>([621, 926])

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
   * Une fonction qui définit les coordonnées en fonction de l'array d'informations fourni.
   *
   * @param {Array} infos - Un array d'informations utilisé pour déterminer les coordonnées.
   * @return {void}
   */
  function setSearchInfos(infos) {
    while (infos.length > 1) {
      const coordinates = fetchCoordinates(infos)
      if (coordinates.length === 0) {
        infos.shift()
      } else {
        break
      }
    }

    setCoordinates(fetchCoordinates(infos))
  }


  /**
   * Détermine si un élément a été trouvé en vérifiant si les coordonnées correspondent aux coordonnées attendues.
   *
   * @return {boolean} Retourne true si l'élément a été trouvé, false sinon.
   */
  function haveBeenFound() {
    return coordinates[0] !== 621 || coordinates[1] !== 926
  }

  return [coordinates, haveBeenFound, setSearchInfos]
}
