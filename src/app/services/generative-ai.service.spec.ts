import { TestBed } from '@angular/core/testing';

import { GenerativeAIService } from './generative-ai.service';

describe('GenerativeAIService', () => {
  let service: GenerativeAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerativeAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
