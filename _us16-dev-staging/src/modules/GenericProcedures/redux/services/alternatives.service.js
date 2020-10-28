import SharedModule from 'modules/shared/index'
const {
  libs: { ServiceFetcher },
} = SharedModule

export const alternativerService0 = (percentage) => {
  return ServiceFetcher('/simulation/pension', {
    method: 'POST',
    body: { percentage: 0 },
  })
}

export const alternativerService25 = (percentage) => {
  return ServiceFetcher('/simulation/pension', {
    method: 'POST',
    body: { percentage: 25 },
  })
}

export const alternativerService50 = (percentage) => {
  return ServiceFetcher('/simulation/pension', {
    method: 'POST',
    body: { percentage: 50 },
  })
}

export const alternativerService75 = (percentage) => {
  return ServiceFetcher('/simulation/pension', {
    method: 'POST',
    body: { percentage: 75 },
  })
}

export const alternativerService955 = (percentage) => {
  return ServiceFetcher('/simulation/pension', {
    method: 'POST',
    body: { percentage: 95.5 },
  })
}

export const alternativerService45 = (percentage) => {
  return ServiceFetcher('/simulation/pension', {
    method: 'POST',
    body: { percentage: 4.5 },
  })
}
