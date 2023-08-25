import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoChartComponent } from './demo-chart.component';
import { PopulationService } from '../service/population.service';
import {of} from "rxjs";

describe('DemoChartComponent', () => {
  let component: DemoChartComponent;
  let fixture: ComponentFixture<DemoChartComponent>;
  let mockPopulationService: jasmine.SpyObj<PopulationService>;

  beforeEach(() => {
    mockPopulationService = jasmine.createSpyObj('PopulationService', ['getPopulationData']);

    TestBed.configureTestingModule({
      declarations: [DemoChartComponent],
      providers: [
        { provide: PopulationService, useValue: mockPopulationService },
      ],
    });

    fixture = TestBed.createComponent(DemoChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart data and call Highcharts.chart on ngOnInit', () => {
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
    mockPopulationService.getPopulationData.and.returnValue(of(mockPopulationData));

    component.ngOnInit();
    expect(mockPopulationService.getPopulationData).toHaveBeenCalled();
  });
});
