import { Component, OnInit, Input } from '@angular/core';
import { HttpProviderService } from 'src/app/service/http-provider.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  constructor(private service: HttpProviderService) {}

  CategoryName = '';
  SegmentId = '';

  ngOnInit(): void {}

  addtheCategory() {
    const cat = {
      CategoryName: this.CategoryName,
      SegmentId: this.SegmentId,
    };

    this.service.addCategory(cat).subscribe((res) => {
      console.log(res);
      alert(res.toString());
    });
  }
}
