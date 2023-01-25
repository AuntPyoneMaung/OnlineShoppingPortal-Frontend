import { Component, OnInit, Input } from '@angular/core';
import { HttpProviderService } from 'src/app/service/http-provider.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  constructor(private service: HttpProviderService) {}

  @Input() cat: any;
  CategoryId = '';
  CategoryName = '';
  ngOnInit(): void {
    this.CategoryId = this.cat.CategoryId;
    this.CategoryName = this.cat.CategoryName;
  }

  addtheCategory() {
    var dept = {
      CategoryId: this.CategoryId,
      CategoryName: this.CategoryName,
    };
    this.service.addCategory(dept).subscribe((res) => {
      alert(res.toString());
    });
  }
}
