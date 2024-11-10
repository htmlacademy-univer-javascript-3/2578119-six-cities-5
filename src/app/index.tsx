import {MainPage} from '../pages/main-page';

type Props = {
  offersCount: number;
}

export function App({offersCount}: Props) {
  return <MainPage offersCount={offersCount}/>;
}

