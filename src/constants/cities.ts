import {CityName} from './enum.ts';
import {City} from '../types.ts';
export const cities: Record<CityName, City> = {
  Paris: {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 8,
    }
  },
  Cologne: {
    name: CityName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 8,
    }
  },
  Brussels: {
    name: CityName.Brussels,
    location: {
      latitude: 50.8476,
      longitude: 4.3572,
      zoom: 8,
    }
  },
  Amsterdam: {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.374,
      longitude: 4.89,
      zoom: 8,
    }
  },
  Hamburg: {
    name: CityName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 8,
    }
  },
  Dusseldorf: {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 8,
    }
  },
};
