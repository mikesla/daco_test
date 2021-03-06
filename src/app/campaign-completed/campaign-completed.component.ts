import { Component, ViewChild } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { DacoService } from '../util/daco.sevice';
import { count } from 'rxjs/operator/count';

declare let jQuery: any;


import { TableComponent } from '../shared/components/table/table.component';









@Component({
  selector: 'app-campaign-completed',
  templateUrl: './campaign-completed.component.html'
})
export class CampaignCompletedComponent {

  @ViewChild(TableComponent)
  private tableComponent: TableComponent;


  searchText: string = '';


  columns: Array<any> = [
    //{ title: 'Заявитель', name: 'addressOwner', sort: false,type:'link' },
    //{ title: 'Кошелек для сборя средств', name: 'addressWallet', sort: false },
    { title: 'Сумма', name: 'amount', sort: false, type: 'text' },
    { title: 'Описание кампании', name: 'description', sort: false, type: 'text'},
    { title: 'Ссылка', name: 'link', sort: false,type: 'descriptionlink' },
    { title: 'Дата кампании', name: 'campaignSince', sort: false, type: 'text'},
    { title: 'Дата закрытия', name: 'campaignUntil', sort: false, type: 'text'},
    { title: 'Всего собрано', name: 'finishedAmount', sort: false, type: 'text'},
  ];
  page: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 5;
  numPages: number = 1;
  length: number = 0;

  config: any = {
    paging: true,
    sorting: { columns: this.columns },
    //filtering: { filterString: '', columnName: 'status' }
  };

  accounts: string[];
  members: any[] = [];
  isLoaded: boolean = false;


  private counts: any[] = [];


  status = '';



  constructor(

    private dacoService: DacoService
  ) {
    console.log('Constructor: ' + 'ProposalComponent');

  }

  async ngOnInit() {

    await this.dacoService.setupDacoContract();
    await this.dacoService.test;
    await this.refreshData();


  }

  watchAccount() {
    this.dacoService.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      //this.model.account = accounts[0];
      this.refreshData();
      this.isLoaded = true;

    });
  }


  async  refreshData() {


    try {


      this.members = await this.dacoService.getСampaignCompleted();
      this.tableComponent.refreshData(this.members);
      console.log('Refreshing data');


    } catch (e) {
      console.log(e);
      //this.setStatus('Error getting balance; see log.');
    }
  }













}
