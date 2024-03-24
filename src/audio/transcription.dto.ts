export class TranscriptionDto {
  speaker: string;
  content: TranscriptionContentDto;
  start: number;
  end: number;
  embedding: number[];
}

export class TranscriptionContentDto {
  text: string;
  segments: TranscriptionSegmentDto[];
  language: string;
}

export class TranscriptionSegmentDto {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
}
