const statusesStep1 = [{ code: "REGISTERED", value: "Registrado", step: 1 }];
const statusesStep2 = [
  { code: "IN_PROCESS", value: "En proceso", step: 2 },
  { code: "ACCEPTED", value: "Aceptado", step: 2 },
  { code: "OBSERVED", value: "Observado", step: 2 },
];
const statusesStep3 = [
  { code: "FINISHED", value: "Finalizado", step: 3 },
  { code: "REJECTED", value: "Rechazado", step: 3 },
];
export const statusesSteps = [statusesStep1, statusesStep2, statusesStep3];

export const states = [...statusesStep1, ...statusesStep2, ...statusesStep3];

export const statesColors = {
  REGISTERED: "colorGrayLineDashed",
  IN_PROCESS: "colorBlueInfo",
  ACCEPTED: "colorGreensuccess",
  OBSERVED: "colorRedError",
  FINISHED: "colorOrangeMain",
  REJECTED: "colorGrayLineDashed",
};
