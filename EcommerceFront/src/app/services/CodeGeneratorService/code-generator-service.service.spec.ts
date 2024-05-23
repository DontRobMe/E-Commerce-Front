import { TestBed } from '@angular/core/testing';

import { CodeGeneratorServiceService } from './code-generator-service.service';

describe('CodeGeneratorServiceService', () => {
  let service: CodeGeneratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeGeneratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
