import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProductoPage } from './detail-producto.page';

describe('DetailProductoPage', () => {
  let component: DetailProductoPage;
  let fixture: ComponentFixture<DetailProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
