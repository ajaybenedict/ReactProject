 
var EmployeeDetails = React.createClass({ 

  getInitialState: function () {
      return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', Tab1Txt:'Add', data1: []};
  },
  handleChange: function(e) {
      this.setState({[e.target.name]: e.target.value});
  },

  componentDidMount() {
      $.ajax({
          url: "api/getdata",
          type: "GET",
          dataType: 'json',
          ContentType: 'application/json',
          success: function(data) {         
              this.setState({data1: data}); 
          }.bind(this),
              error: function(jqXHR) {
              console.log(jqXHR);
          }.bind(this)
      });
  },
  
  DeleteData(id){
      var studentDelete = {
          'id': id
      };      
      $.ajax({
          url: "/api/Removedata/",
          dataType: 'json',
          type: 'POST',
          data: studentDelete,
          success: function(data) {
              alert(data.data);
              this.componentDidMount();
          }.bind(this),
          error: function(xhr, status, err) {
              alert(err); 
          }.bind(this),
      });
  },
 


  EditData(item) {         
      this.setState({name: item.name,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update', Tab1Txt:'Update'});
      $("#View").removeClass('active');
      $("#tab2").removeClass('fade active in');
      $("#Edit").addClass('active');
      $("#tab1").show();
  },

  handleClick: function() {
 
      var Url="";
      if(this.state.Buttontxt=="Save"){
          Url="/api/savedata";
      }
      else{
          Url="/api/Updatedata";
      }
      var studentdata = {
          'name': this.state.name,
          'address':this.state.address,
          'email':this.state.email,
          'contact':this.state.contact,
          'id':this.state.id,
      }
      $.ajax({
          url: Url,
          dataType: 'json',
          type: 'POST',
          data: studentdata,
          success: function(data) {      
              console.log(data);       
              this.setState(this.getInitialState());
              this.setState({data1: data}); 
              //this.componentDidMount();
              $("#Edit").removeClass('active');
              $("#tab1").removeClass('fade active in');
              $("#View").addClass('active');
              $("#tab2").addClass('fade active in');
             
          }.bind(this),
          error: function(xhr, status, err) {
              alert(err);     
          }.bind(this)
      });
  },

  render: function() {
    
    return ( 
      <div  className="container"  style={{marginTop:'50px'}}>
        <p className="text-center" style={{fontSize:'25px'}}><b> Employee Details</b></p>
          <div className="content_area">
            <ul id="myTabs" className="nav nav-tabs responsive" role="tablist">
              <li id="Edit" role="presentation" className="active">
                 <a href="#tab1" aria-controls="Edit" role="tab" data-toggle="tab">{this.state.Tab1Txt}</a>
              </li>
              <li id="View" role="presentation">
                <a href="#tab2" aria-controls="View" role="tab" data-toggle="tab">View</a>
              </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="tab1">
                    <div className="content_area">
                        <form>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-lg-3 col-comn">Name </label>
                                <div className="col-md-5 col-sm-5 col-lg-3">
                                    <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />
                                    <input type="hidden" value={this.state.id}    name="id"  />
                                </div>
                              </div>
                              <div className="form-group">
                                  <label className="control-label col-md-3 col-sm-3 col-lg-3 col-comn">Address </label>
                                  <div className="col-md-5 col-sm-5 col-lg-3">
                                      <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />
                                  </div>
                              </div>
                              <div className="form-group">
                                  <label className="control-label col-md-3 col-sm-3 col-lg-3 col-comn">Email </label>
                                  <div className="col-md-5 col-sm-5 col-lg-3">
                                      <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />
                                  </div>
                              </div>
                              <div className="form-group">
                                  <label className="control-label col-md-3 col-sm-3 col-lg-3 col-comn">Contact </label>
                                  <div className="col-md-5 col-sm-5 col-lg-3">
                                      <input type="text"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />
                                  </div>
                              </div>
                              <div className="common_btn text-center">
                                  <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
                            </div>
                        </form>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tab2">
                  <div className="content_area">
                      <form>
                        <div className="content_area">
                           <table className="table table-hover scrollArrow">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Edit</th>
                                        <th>Change</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                   {this.state.data1.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td> 
                                        <td>{item.name}</td>                      
                                        <td>{item.address}</td>
                                        <td>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <td> 

                                            <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>    
                                        </td> 
                                        <td> 
                                            <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>
                                        </td> 
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
          </div>

      </div>
      
    );
  }
});

ReactDOM.render(<EmployeeDetails  />, document.getElementById('root'))