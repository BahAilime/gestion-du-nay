import { useState } from 'react'

export default function useFindCoordinates() {
  const [coordinates, setCoordinates] = useState<[number, number]>([621, 926])

  /**
   * Trouve les coordonnées d'un lieu en utilisant les informations fournies dans un array de strings
   *
   * @param {Array} infos - Un tableau d'informations pour lesquelles récupérer les coordonnées.
   * @return {Array} Un tableau contenant les coordonnées du lieu si trouvées, sinon un tableau vide.
   */
  async function fetchCoordinates(infos: string[]): Promise<[number, number]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${infos.join(", ")}`
    try {
      const response = await fetch(encodeURI(url))
      const data = await response.json()
      return data.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : [621, 926]
    } catch (error) {
      console.log(error)
    }
    return [621, 926]
  }

  /**
   * Une fonction qui définit les coordonnées en fonction de l'array d'informations fourni.
   *
   * @param {Array} infos - Un array d'informations utilisé pour déterminer les coordonnées.
   * @return {void}
   */
  async function setSearchInfos(infos: string[]) {
    while (infos.length > 1) {
      const coo = await fetchCoordinates(infos)
      if (Number(coo.length) === 0) {
        infos.shift()
      } else {
        break
      }
    }

    setCoordinates(await fetchCoordinates(infos))
  }

  return [coordinates, setSearchInfos]
}
