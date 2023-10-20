// declaration of important variables and data structures
adjacencyArray = [];
degreeOfNodes = 0;
sumOfOddDegrees = 0;
myOddNodes = [];
Eulerian = true;
continueAlgorithm = true;
eulerianCircuit = [1];
insertPlace = -1;
startingNode = 0;
currentRow = 0;
previousNode = 0;
startingNodeChanged = false;
previousNodeIndexes = [];
availableStartingNodes = [];
startNodeFound = false;

// Obtaining number of nodes in order to iterate through matrix creation properly
numberOfNodes = parseInt(prompt("Enter number of nodes in given graph"));

//Creation of adjacency matrix
for (i = 1; i <= numberOfNodes; i++) {

  nextRowInput = prompt("Please enter row " + i + " in the adjacency matrix. Separate each element with a space. Do not add a space after the last element.");
  arrayRow = nextRowInput.split(" ");
  console.log(arrayRow)
  intArray = []
  intArray = arrayRow.map(Number);
  console.log(intArray);
  adjacencyArray.push(intArray);
  console.log(adjacencyArray)
}

//console.log(adjacencyArray[1][1]);

// finds the degree of each node according to relative row in matrix and marks nodes with odd degrees
for (i = 0; i < adjacencyArray.length; i++){
  sum = adjacencyArray[i].reduce((currentTotal, currentValue) => {
    return currentValue + currentTotal
  },0); 
  if (sum % 2 == 1){
    Eulerian = false;
    break;
  }
}

if (Eulerian == false){
  console.log("The graph you have given is not Eulerian.");
}

else {
  console.log("The graph you have given is Eulerian!");
  console.log("Here is the Eulerian circuit:");
  while(continueAlgorithm){
    //adjusting the matrix once nodes are visited
    nodeToAdd = adjacencyArray[currentRow].findIndex(function(degree) {
      return degree > 0;})
    adjacencyArray[currentRow][nodeToAdd] -= 1;
    adjacencyArray[nodeToAdd][currentRow] -= 1;

    //adding visited nodes to circuit
    if (startingNodeChanged){
      insertPlace = eulerianCircuit.findIndex(function(insertElement) {
        return insertElement == startingNode + 1;})
      eulerianCircuit.splice(insertPlace + 1, 0, nodeToAdd + 1);
      }
    else{
      eulerianCircuit.splice(previousNode + 1, 0, nodeToAdd + 1);
    }

    function getAllIndexes(arr, val) {
      var indexes = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) != -1){
          indexes.push(i);
      }
      return indexes;
    }

    //Creates an array with all previous indexes
    previousNodeIndexes = getAllIndexes(eulerianCircuit, nodeToAdd + 1);

    //adjusts index to add nodes to the correct place in circiut
    if (previousNodeIndexes.length > 1){
        previousNode = previousNodeIndexes[previousNodeIndexes.length - 2];
    }
    else {
      previousNode = eulerianCircuit.indexOf(nodeToAdd + 1);
    }
    currentRow = nodeToAdd;

    //When the circuit comes back to the starting node we find a new starting node as in Hierholzer's algorithm
    //Checks if have enough available degrees to be a staring node
    if (nodeToAdd == startingNode){
      for (i = 0; i < adjacencyArray.length; i++){
        sum = adjacencyArray[i].reduce((currentTotal, currentValue) => {
          return currentValue + currentTotal
        },0); 
        if (sum > 0){
          availableStartingNodes.push(i);
        }
      }
      //finds a new starting node from available nodes
      for (i = 0; i < availableStartingNodes.length; i++){
        for(j = 0; j < eulerianCircuit.length; j++){
          if(availableStartingNodes[i] == eulerianCircuit[j] ){
            startingNode = availableStartingNodes[i];
            startNodeFound = true;
            break;
          }
        }
        if(startNodeFound){
          break;
        }
      }
      // empties availableStartingNodes
      while(availableStartingNodes.length > 0) {
        availableStartingNodes.pop();
      }
      currentRow = startingNode;
      startingNodeChanged = true;
    }
    else {
      startingNodeChanged = false;
    }
    //Checks if algoritm is finished
    for (i = 0; i < adjacencyArray.length; i++){
    continueAlgorithm = adjacencyArray[i].some((element) => {
      return element > 0;
      })
      if (continueAlgorithm == true){
        break;
      }

    }
    //for debugging purposes
    /*
    console.log(adjacencyArray[0]);
    console.log(adjacencyArray[1]);
    console.log(adjacencyArray[2]);
    console.log(adjacencyArray[3]);
    console.log(adjacencyArray[4]);
    console.log(adjacencyArray[5]);
    console.log(nodeToAdd + 1);
    console.log("new matrix");
    console.log(eulerianCircuit);
    */
  }
  console.log(eulerianCircuit);

}



