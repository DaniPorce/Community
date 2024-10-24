export interface Preparation {
  id: number;
  ambientale: string;
  firstReading: {
    reader: string;
    admin: string;
    text: string;
  };
  secondReading: {
    reader: string;
    admin: string;
    text: string;
  };
  thirdReading: {
    reader: string;
    admin: string;
    text: string;
  };
  gospel: {
    reader: string;
    text: string;
  };
  date: string;
}

