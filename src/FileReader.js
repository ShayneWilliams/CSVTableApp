import React from 'react';
import Customers from './data1.csv'
import { Accordion, Card, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Papa from 'papaparse'

class FileReader extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined,
        uploadedCsv: undefined
      };
      this.updateData = this.uploadData.bind(this);
      this.uploadData = this.uploadData.bind(this);
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
        header: true
        
      } );
    };
  
    uploadData(result) {
      var data = result.data;
      console.log(data);
      this.setState({
          uploadedCsv: data
      })
    }
  updateData(){
      this.state.csvfile.push(this.state.uploadData)
  }
    render() {
      //console.log(this.state.csvfile);
      return (
        <div className="App">
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
          
          <button onClick={this.importCSV}> Upload now!</button>
          <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        View Full List
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
          <div>
          {/* <p>{this.state.uploadedCsv}</p> */}
          <p>{`${this.state.uploadedCsv}`}</p>
    {/* <p>{this.state.uploadedCsv}</p> */}
    </div>
    </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
   
        </div>
      );
    }
  }

  export default FileReader;