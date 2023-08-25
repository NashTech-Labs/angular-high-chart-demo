import {TestBed} from '@angular/core/testing';
import {PopulationService} from './population.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PopulationService', () => {
  let service: PopulationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PopulationService],
    });

    service = TestBed.inject(PopulationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return population data', () => {
    const mockPopulationData = [
      {
        "Country": "India",
        "Population": "1,428,627,663",
        "NetChange": "11,454,490",
        "WorldShare": "17.76 %"
      },
      {
        "Country": "China",
        "Population": "1,425,671,352",
        "NetChange": "-215,985",
        "WorldShare": "17.72 %"
      }
    ];

    service.getPopulationData().subscribe(data => {
      expect(data).toEqual(mockPopulationData);
    });

    const req = httpMock.expectOne(service['dataUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockPopulationData);
  });
});
