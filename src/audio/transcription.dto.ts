export class TranscriptionDto {
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
