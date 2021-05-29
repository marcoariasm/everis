/**
 * Mapea los escenarios para las casuisticas de ubigeo
 */
export enum EUbigeoState {
  /**
   * Distrito en grupo uno y cliente con DNI
   */
  DISTRICT_IN_GROUP_ONE_WITH_DNI = 'DIGOWD',
  /**
   * Distrito en grupo uno y cliente sin DNI
   */
  DISTRICT_IN_GROUP_ONE_WITHOUT_DNI = 'DIGOWOD',
  /**
   * Distrito en grupo dos
   */
  DISTRICT_IN_GROUP_TWO = 'DIGT',
  /**
   * Distrito sin grupo y AFP Integra o Habitat
   */
  DISTRICT_WITHOUT_GROUP_AFP_IH = 'DWGAIH',
  /**
   * Distrito sin grupo y AFP PROSEGURO o AFP
   */
  DISTRICT_WITHOUT_GROUP_AFP_PP = 'DIGWPP',

  DISTRICT_NOT_SELECTED = 'DNS'
}
