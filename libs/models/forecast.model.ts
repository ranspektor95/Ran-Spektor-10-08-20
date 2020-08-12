export interface ForecastModel{
  Date : Date,
  Temperature : TemperatureModel,
  Day : IconModel,
  Night: IconModel
}

export interface TemperatureModel{
  Minimum: {Value: number, Unit: String},
  Maximum: {Value: number, Unit: String}
}

export interface IconModel{
  Icon : number,
  IconPhrase : string
}


