// declaration of important variables and data structures

//array that will contain lines of adjacency matrix
adjacencyArray = [];
//variable that will contain the user inputted number of nodes in graph
degreeOfNodes = 0;
//if graph is eulerian
eulerian = true;
//when set to true, continues algorithmic process
continueAlgorithm = true;
//contains our result! The degrees in the graph that must be walked in a Eulerian circuit
eulerianCircuit = [1];
//adjusts where to add next nodes in Eulerian circuit if a new point is chosen in Hierholzers algorithm
insertPlace = -1;
//set to which node Hierholzer's algorithm begins in each cycle
startingNode = 0;
//index of array that will be adjusted or accessed
currentRow = 0;
//the node previously added to eulerianCircuit
previousNode = 0;
//changes when a Eulerian walk is complete
startingNodeChanged = false;
//contains indexes in Eulerian circuit where previousNode exists
previousNodeIndexes = [];
//contains nodes that have not already been fully visited
availableStartingNodes = [];
//is true after a new staring node is found
startNodeFound = false;

// Obtaining number of nodes in order to iterate through matrix creation properly
numberOfNodes = parseInt(prompt("Enter number of nodes in given graph"));

//Creation of adjacency matrix
//iterates through the number of nodes
for (i = 1; i <= numberOfNodes; i++) {
  //prompts for new row and requires specific syntax
  nextRowInput = prompt(
    "Please enter row " +
      i +
      " in the adjacency matrix. Separate each element with a space. Do not add a space after the last element."
  );
  //splits input into array format elements are strings
  arrayRow = nextRowInput.split(" ");
  //logs inputted row
  intArray = [];
  //converts arrayRow into integer arry
  intArray = arrayRow.map(Number);
  //adds row to adjacency matrix
  adjacencyArray.push(intArray);
}

// finds the degree of each node according to relative row in matrix

//iterates through adjacency matrix
for (i = 0; i < adjacencyArray.length; i++) {
  //takes the sum of the degrees
  sum = adjacencyArray[i].reduce((currentTotal, currentValue) => {
    return currentValue + currentTotal;
  }, 0);
  //checks if the degrees' sum is odd and if so marks it as not Eulerian
  if (sum % 2 == 1) {
    eulerian = false;
    break;
  }
}
//if graph is not Eulerian
if (eulerian == false) {
  //tells the user the graph is not eulerian
  console.log("The graph you have given is not Eulerian.");
  //if the graph is Eulerian
} else {
  //tells the user the graph is Eulerian
  console.log("The graph you have given is Eulerian!");
  //tells the user they should expect the Eulerian circuit
  console.log("Here is the Eulerian circuit:");
  //continues algorithm until continueAlgorithm is marked false
  while (continueAlgorithm) {
    //finds the node to add that will be "visited" in the eulerian circuit
    nodeToAdd = adjacencyArray[currentRow].findIndex(function (degree) {
      //visits the first node with a degree greater than zero
      return degree > 0;
    });
    //adjusts the matrix once nodes are visited, lowering the degree of the node
    adjacencyArray[currentRow][nodeToAdd] -= 1;
    //adjusts the matrix once nodes are visited, lowering the degree of the node on the corresponding node
    adjacencyArray[nodeToAdd][currentRow] -= 1;

    //adding visited nodes to circuit
    //checks if the staring node has changed as in Hierholzer's algorithm
    if (startingNodeChanged) {
      //finds the index so that the next node can be inserted after the starting node
      insertPlace = eulerianCircuit.findIndex(function (insertElement) {
        return insertElement == startingNode + 1;
      });
      //adds next node to proper place after new starting node to eulerian circuit
      eulerianCircuit.splice(insertPlace + 1, 0, nodeToAdd + 1);
      //if the starting node didn't change
    } else {
      //adds the node after the last node that was added to Eulerian circuit
      eulerianCircuit.splice(previousNode + 1, 0, nodeToAdd + 1);
    }
    //gets all indexes of the last node to be added to Eulerian circuit
    function getAllIndexes(arr, val) {
      //stores the indexes
      var indexes = [],
        //stores the iterator
        i;
      //iterates through Eulerian circuit array
      for (i = 0; i < arr.length; i++) {
        //checks if the last node to be added to Eulerian circuit array is equal to the Eulerian circuit at index i
        if (arr[i] === val) {
          //adds index to array of indexes
          indexes.push(i);
        }
      }
      //returns array of indexes
      return indexes;
    }

    //Creates an array with all previous indexes
    previousNodeIndexes = getAllIndexes(eulerianCircuit, nodeToAdd + 1);

    //if the there have been multiple nodes added to the Eulerian circuit with the same value
    if (previousNodeIndexes.length > 1) {
      //determines the correct index of the last node added
      previousNode = previousNodeIndexes[previousNodeIndexes.length - 2];
      //if the there have not been multiple nodes added to the Eulerian circuit with the same value
    } else {
      //determines the correct index of the last node added
      previousNode = eulerianCircuit.indexOf(nodeToAdd + 1);
    }
    //sets the next current row to the node we went to
    currentRow = nodeToAdd;

    //When the circuit comes back to the starting node we find a new starting node as in Hierholzer's algorithm
    //if the node to add came back to the starting node
    if (nodeToAdd == startingNode) {
      //iterates through adjacency matrix
      for (i = 0; i < adjacencyArray.length; i++) {
        //finds the degree of the node
        sum = adjacencyArray[i].reduce((currentTotal, currentValue) => {
          return currentValue + currentTotal;
        }, 0);
        //Checks if degree is greater than zero
        if (sum > 0) {
          //adds the available node to availableStartingNodes array
          availableStartingNodes.push(i);
        }
      }
      //finds a new starting node from available nodes
      //iterates through available starting nodes
      for (i = 0; i < availableStartingNodes.length; i++) {
        //iterates through eulerianCircuit
        for (j = 0; j < eulerianCircuit.length; j++) {
          //checks if the available starting nodes are to be found in the eulerianCircuit
          if (availableStartingNodes[i] == eulerianCircuit[j]) {
            //if one is found, it is assigned to be the new staring node
            startingNode = availableStartingNodes[i];
            //startNode found is marked as true
            startNodeFound = true;
            //breaks first for loop
            break;
          }
        }
        if (startNodeFound) {
          //breaks second for loop
          break;
        }
      }
      // empties availableStartingNodes so that it will not interfere the next time a new starting node is needed
      while (availableStartingNodes.length > 0) {
        availableStartingNodes.pop();
      }
      //makes the next row to go to in adjacencyArray the starting node as each row represents a node
      currentRow = startingNode;
      //marks startingNodeChanged so that nodes will be added in at the proper index in the next iteration
      startingNodeChanged = true;
      //if the node to add did not come back to the start
    } else {
      //the starting node is not changed
      startingNodeChanged = false;
    }
    //Checks if algoritm is finished
    //iterates through adjacencyArray by row
    for (i = 0; i < adjacencyArray.length; i++) {
      //if one element in the row at i is greater than zero continueAlgorithm is true
      continueAlgorithm = adjacencyArray[i].some((element) => {
        return element > 0;
      });
      // once continue algorithm is true
      if (continueAlgorithm == true) {
        //we automatically return to the next step in the algorithm
        break;
      }
    }
  }
  //logs complete eulerian circuit to console
  console.log(eulerianCircuit);
}
