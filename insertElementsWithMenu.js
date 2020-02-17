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

        for (let index = 0; index < obj.length; index++) {
          const subnet = obj["Subnets"][index];
          const vpcId = subnet["VpcId"];
          console.log(vpcId);
        } 
        
        

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
