/**
* A draw.io plugin for inserting a custom text (or ellipse) element,
* either by keyboard Ctrl+Shift+T (or Ctrl+Shift+Q) or by menu
*/
Draw.loadPlugin(function(ui) {
    /* Finding assigned keys:
    
      * Open javascript console
      * Draw.valueOf()
      * Traverse to: Object > loadPlugin > <function scope> 
                    > ui > keyHandler > controlShiftKeys
      * The number here is ASCII character code 
    */

   let cells = [];
  function addCell(id,Value,x,y,mxgraph) {
      subnet1 = new mxCell();
       subnet1.setId(id);
       subnet1.setValue(Value);
       geom1 = new mxGeometry();
       if("Availability zone" == Value) {
         //subnet1.setStyle("outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_availability_zone;strokeColor=#545B64;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#545B64;dashed=1;");
         geom1.setHeight(120);
         geom1.setWidth(480);
       }
       if("Private subnet" == Value) {
         //subnet1.setStyle("points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_security_group;grStroke=0;strokeColor=#147EBA;fillColor=#E6F2F8;verticalAlign=top;align=left;spacingLeft=30;fontColor=#147EBA;dashed=0;");
         geom1.setHeight(90);
         geom1.setWidth(130);
       }
       
       if("VPC" == Value) {
         //subnet1.setStyle("points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_vpc;strokeColor=#248814;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#AAB7B8;dashed=0;");
         geom1.setHeight(540);
         geom1.setWidth(730);
       }
       
       subnet1.setVertex(true);
       //subnet1.setParent(1);
       
      // geom1.setAs("geometry");
       //geom1.setHeight(90);
       //geom1.setWidth(130);
       geom1.setX(x);
       geom1.setY(y);
       subnet1.setGeometry(geom1);
       cells.push(subnet1);
       mxgraph.addCell(subnet1);
       
       //return (mxCell) mxgraph.getModel().getParent(subnet1);
       //mxgraph.setAutoSizeCells(true);
       //mxgraph.setSwimlaneNesting(true);
       //mxOrganicLayout layout = new mxOrganicLayout(mxgraph);
      
       //layout.execute(mxgraph.getDefaultParent());
       //mxgraph=layout.getGraph();
       
       //mxgraph.
       
 }
 function getCellById(id) {
		
  for(cell in cells) {
    if(cell.getId()==id)
      return cell;
  }
  //return new mxCell();
    return null;
}
 function CellMapper(subs,mxgraph) {
   let i =0;
   let azid = "";
   let vpcid= "";
   let a = 0;
   let s = 0;
   
    azs = [];
    vpcs = [];
    subsaz = [];
  for(sub in subs) {
    vpcId = sub["VpcId"];
    
    if(vpcId!=null && !vpcs.includes(vpcId)) {
      
      addCell(vpcId,"VPC",10,20,mxgraph);
      vpcid=vpcId;
      console.log(vpcid);
      vpcs.push(vpcId);
    }
  
  azID = sub["getAvailabilityZoneId"];
  
  if(azID!=null && !azs.includes(azID)) {
    addCell(azID,"Availability zone",40,30+a,mxgraph);
    azid=azID;
    console.log(azID);
     azs.push(azID);
    vpc =getCellById(vpcid);
    az = getCellById(azID);
    if(vpc != null && az.getGeometry().getX() > vpc.getGeometry().getX()+vpc.getGeometry().getWidth() || az.getGeometry().getY()+az.getGeometry().getHeight() > vpc.getGeometry().getY()+vpc.getGeometry().getHeight()) {
      parent=mxgraph.getModel().getParent(vpc);
      geom = vpc.getGeometry();
      geom.setHeight(az.getGeometry().getY()+az.getGeometry().getHeight());
      mxgraph.getModel().setGeometry(vpc,geom);
      console.log(az.getGeometry().getY()+az.getGeometry().getHeight());
      console.log(vpc.getGeometry().getY()+vpc.getGeometry().getHeight());
    }
    a=a+140;
  }
  if(subsaz.includes(azID)) {
    console.log(azID);
     azs.push(azID);	
  addCell(sub.getSubnetId(),"Private subnet",280,30+(140*(Integer.parseInt(Character.toString((azID.charAt(azID.length()-1))))-1)),mxgraph);
    vpc =getCellById(vpcid);
    az = getCellById(azID);
  if(vpc != null && (az.getGeometry().getX() > vpc.getGeometry().getX()+vpc.getGeometry().getWidth() || az.getGeometry().getY()+az.getGeometry().getHeight() > vpc.getGeometry().getY()+vpc.getGeometry().getHeight())) {
    parent= mxgraph.getModel().getParent(vpc);
    geom = vpc.getGeometry();
    geom.setHeight(az.getGeometry().getY()+az.getGeometry().getHeight());
    mxgraph.getModel().setGeometry(vpc,geom);
    console.log(az.getGeometry().getY()+az.getGeometry().getHeight());
    console.log(vpc.getGeometry().getY()+vpc.getGeometry().getHeight());
    
  
  }else {
    addCell(sub["getSubnetId"],"Private subnet",80,30+(140*(Integer.parseInt(Character.toString((azID.charAt(azID.length()-1))))-1)),mxgraph);
    subsaz.push(azID);
  }
}
 }
}

    // Adds resources for actions
    mxResources.parse('myInsertText=Insert text element');
    mxResources.parse('myInsertEllipse=Insert ellipse');
    mxResources.parse('addJson=addJson');
    
    // Adds action : myInsertEllipse
    ui.actions.addAction('addJson', function() {
        
        var theGraph = ui.editor.graph;
               if (window.XMLHttpRequest) {
           xmlhttp = new XMLHttpRequest();
        } else {
           xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //importClass(packages.com.mxGraph1.XMLtoJava);

        //XMLtoJava.testMapper();
        xmlhttp.open("GET", "sub2.xml", false);
        xmlhttp.send();
        xmlDoc = xmlhttp.responseXML;
        let doc = xmlDoc;

        xmlhttp.open("GET", "subnet.json", false);
        xmlhttp.send();
        var obj = JSON.parse(xmlhttp.responseText);
        let jsonDoc = JSON.parse(xmlhttp.responseText);
        for (const property in obj) {
          console.log(`${property}: ${obj[property]}`);
        }
       console.log(obj["Subnets"][0]["VpcId"])
        let subnets = obj["Subnets"];

        for (let index = 0; index < subnets.length; index++) {
          const subnet = subnets[index];
          const vpcId = subnet["VpcId"];
          console.log(vpcId);
        } 
        
        
    CellMapper(subnets,theGraph);  
    ui.editor.setGraphXml(doc.documentElement);    
    
      if(theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())){
          var pos=theGraph.getInsertPoint();
          var newElement=new mxCell("",
                    new mxGeometry(pos.x, pos.y, 80, 80),
                    "ellipse;whiteSpace=wrap;html=1;");
  
          newElement.vertex=!0;
          theGraph.setSelectionCell(theGraph.addCell(newElement))
        }
    }, null, null, "Ctrl+Shift+Q");
    
    ui.keyHandler.bindAction(81, !0, "addJson", !0);
    
    ui.actions.addAction('myInsertText', function() {
    	
        var theGraph = ui.editor.graph;
        if(theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())){
          var pos=theGraph.getInsertPoint();
          var newElement=new mxCell("",
                    new mxGeometry(pos.x, pos.y, 80, 80),
                    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;overflow=auto");
        
          newElement.vertex=!0;
          theGraph.setSelectionCell(theGraph.addCell(newElement))
        }
    }, null, null, "Ctrl+Shift+T");
    
    ui.keyHandler.bindAction(84, !0, "myInsertText", !0);
    
    // Adds menu
    ui.menubar.addMenu('My Menu', function(menu, parent) {
        ui.menus.addMenuItem(menu, 'myInsertText');
        ui.menus.addMenuItem(menu, 'addJson');
    });

    // Reorders menubar
    ui.menubar.container
      .insertBefore(ui.menubar.container.lastChild,
                    ui.menubar.container.lastChild.previousSibling.previousSibling);
});
