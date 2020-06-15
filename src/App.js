import React from 'react';
import Customers from './data1.csv';
import { Accordion, Card, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Papa from 'papaparse';
import { CsvToHtmlTable } from 'react-csv-to-table';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      signUpDate: '',
      firstName: '',
      lastName: '',
      email: '',
      latitude: '',
      longitude: '',
      ip: '',
      matchingAccount: '',
      searchAttempt: '',
      csvfile: undefined,
       uploadedCsv: undefined,
        //uploadedCsv: '',
        display: '',
        values: '',
        headers: ''
      
    }
    this.updateData = this.updateData.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.addFirstName = this.addFirstName.bind(this);
    this.addLastName = this.addLastName.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.addSignUpDate = this.addSignUpDate.bind(this);
    this.addLatitude = this.addLatitude.bind(this);
    this.addLongitude = this.addLongitude.bind(this);
    this.addIp = this.addIp.bind(this);
    this.download = this.download.bind(this);
  }
  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
    
  };

  importCSV = () => {
    const  Test  = this.state;
    Papa.parse(Test.csvfile, {
      complete: this.uploadData,
      header: true,
      skipEmptyLines: true
      
    } );
    
  };
  
  uploadData(result) {
    const data = result.data;
    //console.log(data);
    // this.setState({
    //     uploadedCsv: data
    // })
    //console.log('data: ' + data)
    const csvData = this.objectToCsv(data);
    
     //console.log('map attempt: ' + csvData.map(this.renderTableData))
  console.log('csvData ' + csvData)
  this.setState(state => ({
      display: `${csvData}`,
    }));
    
    
  }
objectToCsv(data){
  const csvRows = [];
  const headers = Object.keys(data[0]);
  console.log( typeof headers)
  // console.log('headers' + headers.join('<th>'))
  this.setState({
    headersRow: headers.join(',')
  })
  //console.log(Object.keys(data[0]))
  csvRows.push(headers.join(','));
  for ( const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      const escaped = (''+row[header]).replace(/"/g, '\\"');
      return `${escaped}`;
      //return `<td>${escaped}</td>`;
    });
    
    csvRows.push(values.join(','))

    // this.setState(state => ({
    //   display: state.display + csvRows
    // }));
    
  }
  this.setState({
    uploadedCsv: csvRows
  })
  console.log(this.state.uploadedCsv)
  return csvRows.join('\n')
 // console.log('info check' + data)
 // console.log('state display: ' + this.state.display);
  //console.log('map attempt: ' + data.map(this.renderTableData))
 // console.log('csvRows: ' + csvRows)
 // console.log('headers: ' + headers)
 
}

updateData(){
    // this.state.csvfile.push(this.state.uploadData)
}
addEntry(event){
  event.preventDefault();
//console.log('uploadedCsv: ' + this.state.uploadedCsv + ' csvfile: ' + this.state.csvfile )
 console.log(`SignUpDate: ${this.state.signUpDate}, First: ${this.state.firstName},`+
  `Last: ${this.state.lastName}, Email: ${this.state.email}, Latitude: ${this.state.latitude}, `+
  `Longitude: ${this.state.longitude}, IP: ${this.state.ip}}`)
  this.setState(state => ({
    display: state.display + `\n"${this.state.signUpDate}", "${this.state.firstName}", `+
    `"${this.state.lastName}", "${this.state.email}", "${this.state.latitude}", `+
    `"${this.state.longitude}", "${this.state.ip}"`
  }))
}
download(){
  const blob = new Blob([this.state.display], { type: 'txt/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'download.csv');
  document.body.appendChild(a);
  a.click();
  //document.removeChild(a);
}
addSignUpDate(event){
  this.setState({
    signUpDate: event.target.value
  })
}
addFirstName(event){
  this.setState({
    firstName: event.target.value
  })
}
addLastName(event){
  this.setState({
    lastName: event.target.value
  })
}
addEmail(event){
  this.setState({
    email: event.target.value
  })
}
addLatitude(event){
  this.setState({
    latitude: event.target.value
  })
}
addLongitude(event){
  this.setState({
    longitude: event.target.value
  })
}
addIp(event){
  this.setState({
    ip: event.target.value
  })
}
renderTableData(data, index){
return(
  <tr key={index}>
    <td>{data[0]}</td>
    <td>{data.last}</td>
  </tr>
)
}

render(){

  
  return (
  
  <div>
  
      
          
          <div className="App">
            <h1>First:</h1>
          <h2>Import CSV File!</h2>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <br/>
          <button onClick={this.importCSV}> Upload now!</button>
          <br/>
          <button onClick={this.download}>Download New File</button>
          <h2>Then:</h2>
          <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click to View Data:
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <CsvToHtmlTable 
               data={this.state.display}
               csvDelimiter=","
               tableClassName="table table-striped table-hover"/>    
          {/* <div>
          <pre><p>{this.state.display}</p></pre> */}
          
          {/* <Table responsive> */}
  {/* <thead> */}
    {/* <tr>
  {this.state.uploadedCsv.map((data) =>{
    return <td>{data.keys}</td>
  })}
    </tr> */}
  {/* </thead>
  <tbody> */}

    
    {/* {this.state.uploadedCsv.map(this.renderTableData)} */}
  {/* </tbody> */}
{/* </Table> */}
          {/* <p>{this.state.uploadedCsv}</p> */}
          {/* <p>{`${this.state.uploadedCsv}`}</p> */}
    {/* <p>{this.state.values.map(this.renderTableData)}</p> */}
    {/* </div> */}
    </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
<h1>Next:</h1>
<h2>Add Entries:</h2>
          <form className='update-bars' onSubmit={this.addEntry}>
            <h2>Signup Date:</h2>
            <input onChange={ this.addSignUpDate }
            value={this.state.signUpDate}/>
            <h2>First Name:</h2>
            <input onChange={this.addFirstName }
             value={this.state.firstName}/>
            <h2>Last Name:</h2>
            <input onChange={this.addLastName }
             value={this.state.lastName}/>
            <h2>Email:</h2>
            <input onChange={this.addEmail }
             value={this.state.email}/>
            <h2>Latitude:</h2>
            <input onChange={this.addLatitude}
             value={ this.state.latitude}/>
            <h2>Longitude:</h2>
            <input onChange={this.addLongitude }
             value={this.state.longitude}/>
            <h2>Ip Adress:</h2>
            <input onChange={this.addIp }
             value={this.state.ip}/>
            <button type='submit'>Add</button>
          </form>
          
        </div>
        
               {/* <CsvToHtmlTable 
               data={this.state.display}
               csvDelimiter=","
               tableClassName="table table-striped table-hover"/>     */}
        
   
  </div>
  )

  }
}
export default App;
