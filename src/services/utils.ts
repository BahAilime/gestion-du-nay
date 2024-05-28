/**
 * Calcule un prix TTC en fonction de son prix, de sa quantité, de la TVA et d'une remise (optionnelle).
 *
 * @param {number} price - Le prix unitaire.
 * @param {number} qte - La quantité.
 * @param {number} tva - La TVA associé.
 * @param {number} [remise=0] - La remise à effectuer. Par défaut, 0.
 * @return {number} Le prix TTC calculé.
 * @throws {TypeError} Si l'un des paramètres d'entrée n'est pas un nombre.
 */
export function calcPrice( price: number, qte: number, tva: number, remise: number = 0) {
    if (typeof price !== "number" || typeof qte !== "number" || typeof tva !== "number" || typeof remise !== "number") {
        throw new TypeError("price, qte, tva, remise doivent être des nombres");
    }
    return (Math.round((price * qte - remise ) * ((100 + tva) / 100 ) * 100) / 100)
}

/**
 * Convertit une chaîne en nombre.
 *
 * @param {string} str - La chaîne à convertir.
 * @return {number} Le nombre converti. Si la chaîne d'entrée est vide ou contient que des caractères non numériques, 0 est retourné.
 */
export function stringToNumber(str: string) {
    if (str == "") {
      return 0;
    }
    str = str.replace(',', '.');

    const number = parseFloat(str.replace(/[^0-9.]/g, ''))

    return isNaN(number) ? 0 : number;
  }