import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoChartContainerSize } from '../../../interfaces/po-chart-container-size.interface';
import { PoChartModule } from '../../../po-chart.module';
import { PoChartBarBaseComponent } from '../po-chart-bar-base.component';

import { PoChartColumnComponent } from './po-chart-column.component';

describe('PoChartColumnComponent', () => {
  let component: PoChartColumnComponent;
  let fixture: ComponentFixture<PoChartColumnComponent>;

  const containerSize: PoChartContainerSize = {
    svgWidth: 200,
    svgHeight: 200,
    svgPlottingAreaWidth: 20,
    svgPlottingAreaHeight: 20
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoChartModule],
      declarations: [PoChartColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoChartColumnComponent);
    component = fixture.componentInstance;
    component.containerSize = containerSize;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component instanceof PoChartBarBaseComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });

  describe('Methods:', () => {
    describe('barCoordinates:', () => {
      it('should call `calculateElementsMeasurements`, `xCoordinates` and `yCoordinates`', () => {
        const seriesIndex = 0;
        const serieItemDataIndex = 0;
        const minMaxSeriesValues = { minValue: 1, maxValue: 30 };
        const serieValue = 1;

        component.series = [
          { label: 'category', data: [-10, 2, 3] },
          { label: 'category B', data: [10, 20, 30] }
        ];

        const spyCalculateElementsMeasurements = spyOn(
          component,
          <any>'calculateElementsMeasurements'
        ).and.callThrough();
        const spyXCoordinates = spyOn(component, <any>'xCoordinates').and.callThrough();
        const spyYCoordinates = spyOn(component, <any>'yCoordinates').and.callThrough();

        component['barCoordinates'](
          seriesIndex,
          serieItemDataIndex,
          component.containerSize,
          minMaxSeriesValues,
          serieValue
        );

        expect(spyCalculateElementsMeasurements).toHaveBeenCalled();
        expect(spyXCoordinates).toHaveBeenCalled();
        expect(spyYCoordinates).toHaveBeenCalled();
      });

      it('should return a string for the coordinates:', () => {
        const seriesIndex = 0;
        const serieItemDataIndex = 0;
        const minMaxSeriesValues = { minValue: 1, maxValue: 30 };
        const serieValue = 1;

        component.series = [
          { label: 'category', data: [-10, 2, 3] },
          { label: 'category B', data: [10, 20, 30] }
        ];

        const expectedResult = component['barCoordinates'](
          seriesIndex,
          serieItemDataIndex,
          component.containerSize,
          minMaxSeriesValues,
          serieValue
        );
        expect(expectedResult).toBe('M 82 28 L 92 28 L 92 28 L 82 28 z');
      });
    });

    it('should consider serieValue as 0 for calculations if it is a negative value', () => {
      component.series = [
        { label: 'category', data: [-10, 2, 3] },
        { label: 'category B', data: [10, 20, 30] }
      ];
      const seriesIndex = 0;
      const serieItemDataIndex = 0;
      const minMaxSeriesValues = { minValue: 0, maxValue: 30 };
      const serieValue = -10;

      const expectedResult = component['barCoordinates'](
        seriesIndex,
        serieItemDataIndex,
        component.containerSize,
        minMaxSeriesValues,
        serieValue
      );
      expect(expectedResult).toBe('M 82 28 L 92 28 L 92 28 L 82 28 z');
    });

    it('shouldn`t subctract the spaceBetweenBars calculation by the X coordinate if series.length is lower than 2', () => {
      const seriesIndex = 0;
      const serieItemDataIndex = 0;
      const minMaxSeriesValues = { minValue: 1, maxValue: 3 };
      const serieValue = 1;

      component.series = [{ label: 'category', data: [1, 2, 3] }];

      const expectedResult = component['barCoordinates'](
        seriesIndex,
        serieItemDataIndex,
        component.containerSize,
        minMaxSeriesValues,
        serieValue
      );
      expect(expectedResult).toBe('M 86 28 L 100 28 L 100 28 L 86 28 z');
    });
  });
});
