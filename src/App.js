import logo from './logo.svg';
import {React,useState, useEffect, createContext, useContext} from 'react';
import './App.css';
import {AiFillDelete} from  'react-icons/ai';
import {BsCheckCircleFill} from 'react-icons/bs';

function App() {

  //Pour changer le style (active) de la button séléctionnée: A faire et Tâches términées
  const [IsCompleteScreen, setIsCompleterScreen] = useState(0);
  
  //L'Ajout de Tâches (Titre et Description)
  const [allTodos, setTodos] = useState([]); //la tâche à terminer intitailisés par un tableau vide afin de le remplir par le titre et la description de Tâches
  const [NvTitre, setNvTitre] = useState("");
  const [NvDescription, setNvDescription] = useState("");

  const [TaskComplet, setTaskComplet] = useState([]); //Intitailisé par un tableau vide afin de le remplir par le titre et la description de Tâches términées





  //Sauvegarde de la tâche
  const gererElementTodo = () => {

    //Un objet pour stoker le titre et la description de la tache
    let NvItemTodo = {
      Title: NvTitre,
      Description: NvDescription
    }
    
    //Copie de Tableau allTodos à l'aide de speadoperators
    let updateTodoArr = [...allTodos];
    
    //L'ajout du nouveau objet à la copie du tableau
    updateTodoArr.push(NvItemTodo);

    //Mettre à jour le tableau allTodos
    setTodos(updateTodoArr);

    /* Enregister les données de la tâche dans la mémoire locale du navigateur même après sa fermeture par la méthode LocalStorage (API Web Storage) 
     sous forme de chaînes du caractères (Json.stringify permet de convertir un objet en chaines de caractères) */

    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))

  };
  
  
  //Suppression de la tâche définitivement
  const supprimerTache = (index) => {

    let tachesReduites = [... allTodos];
    tachesReduites.splice(index, 1); // splice: pour supprimer l'élément de allTodos à l'index spécifié.

    setTodos(tachesReduites); //mettre à jour le tableau allTodos 
    localStorage.setItem('todolist', JSON.stringify(tachesReduites)); //Pour mettre à jour la mémoire locale du navigateur

  };


  
  
  useEffect(() => {

    //Récupère les données précédemment stockées
    let TodoEnre = JSON.parse(localStorage.getItem('todolist')); //convertir une chaîne de caractères JSON en un objet à l'aide de JSON.parse
    let CompleteTodoEnre = JSON.parse(localStorage.getItem('Completed'));

    if(TodoEnre){ // Pour tester si les données ont été récupérées avec succès
      setTodos(TodoEnre); // Appelle de la méthode setTodos() pour Mettre à jour le tableau allTodos avec les données récupérées
    }

    if(CompleteTodoEnre){ // Pour tester si les données ont été récupérées avec succès
      
      setTaskComplet(CompleteTodoEnre); // Appelle de la méthode setTodos() pour Mettre à jour le tableau allTodos avec les données récupérées
      
    } }, []);
    
    
    
    //Pour Terminer une tâche
    const marquerCommeTermine = (index) => {
      let now = new Date();
      let dd = now.getDate();
      let mm = now.getMonth() + 1; // L'indice commence par 0
      let yyyy = now.getFullYear();
      let h = now.getHours() - 1;
      let m = now.getMinutes();
      let s = now.getSeconds();

      let Datefinale = dd + '-' + mm + '-' + yyyy + ' en ' + h + ':' + m + ':' + s;
      
      let tacheFiltree = {

        ...allTodos[index], //copie la tâche à terminer de allTodos
        Datefinalee: Datefinale

      }
      
      let updateTaskComleteArr = [...TaskComplet];
      updateTaskComleteArr.push(tacheFiltree);
      setTaskComplet(updateTaskComleteArr);
      supprimerTache(index);
      localStorage.setItem('Completed', JSON.stringify(updateTaskComleteArr));
    }
    
    //Suppression de la chache de "Taches Terminées"
    const supprimerTacheTerminee= (index) => {
  
      let tachesReduites = [...TaskComplet];
      tachesReduites.splice(index, 1); // splice: pour supprimer l'élément de allTodos à l'index spécifié.
  
      setTaskComplet(tachesReduites); //mettre à jour le tableau allTodos 
      localStorage.setItem('Completed', JSON.stringify(tachesReduites)); //Pour mettre à jour la mémoire locale du navigateur
  
    };

    
    return (
      
      
      
    <div className="App">

      {/* Titre  */}
        <h1 className='Titre'>My To Do List</h1>
      

      {/* Container */}
      <div className="Container">

        {/* Début de ToDoInputs  */}
        <div className="ToDoInputs">

          <div className="ToDoInputItem">        
            <label>Titre de la tâche</label>
            <input  type="text" 
                    value={NvTitre} 
                    onChange= { e=>setNvTitre(e.target.value)}  
                    placeholder="Faire un mini-projet par ReactJS" />
          </div>

          <div className="ToDoInputItem">            
            <label>Détails de la tâche</label>
            <input  type="text" 
                    value={NvDescription} 
                    onChange= { e=>setNvDescription(e.target.value)} 
                    placeholder="Un mini-projet To Do List" />
          </div>

          <div className="ToDoInputItem">      
            <button   value="Ajouter" 
                      type='button' 
                      className='Btn' 
                      onClick={gererElementTodo} >Ajouter la tâche
            </button>
          </div>

        </div>

        {/* Fin de ToDoItems  */}


        <div className="BtnZone">

          <button className={`BtnEtat ${IsCompleteScreen === 0 && `active`}`}
                  onClick= { () => setIsCompleterScreen(0)}>A faire</button>
          <button className={`BtnEtat ${IsCompleteScreen === 1 && `active`}`}
                  onClick= { () => setIsCompleterScreen(1)}>Tâches términées</button>

        </div>

        {/* Affichage des tâches  */}
        <div className="todo-list">

            {/* Affichage lorqu'on clique sur: A faire */}
          { IsCompleteScreen==0 && allTodos.map((item, index) =>( // item: l'élement actuel du tab, index: l'indice du tab
            <div className="todo-list-item" key={index}>

                <div>

                  <h3>{item.Title}</h3>
                  <p>{item.Description}</p>

                </div>

                <div>

                  <AiFillDelete 
                    className='icon' 
                    title="Supprimer?"  
                    onClick={() => supprimerTache (index)}/>

                  <BsCheckCircleFill 
                    className='check-icon' 
                    title="Completer?" 
                    onClick={() => marquerCommeTermine (index)}/>

                </div>

              </div>
            )
            )
          }

          {/* Affichage lorqu'on clique sur: Tâches Terminées */}
          { IsCompleteScreen==1 && TaskComplet.map((item, index) =>( // item: l'élement actuel du tab, index: l'indice du tab
            <div className="todo-list-item" key={index}>

                <div>
                  <h3>{item.Title}</h3>
                  <p>{item.Description}</p>
                  <p>La tâche a été terminée le {item.Datefinalee}</p>
                </div>

                <div>
                  <AiFillDelete className='icon' title="Supprimer?"  onClick={() => supprimerTacheTerminee (index)}/>
                </div>

              </div>
            )
            )
          }


        </div>

      </div>





       {/* Fin de contenair  */}
    </div>
    
  );
}

export default App;