import './ListRecipes.css';
import { useEffect, useState } from "react";
import apiFetch from "../axios/config";
import { Link } from 'react-router-dom';

const Recipes = () => {

    const [recipes, setRecipes] = useState([]);
    const [ filteredRecipes, setFilteredRecipes ] = useState();
    const [recipeType, setRecipeType] = useState('todas');

    const getRecipes = async () => {

        try {
            const response = await apiFetch.get('/todas');
            const data = response.data;
            setRecipes(data);
            setFilteredRecipes(data);

        } catch (error) {
            console.log(error);
        }

    }

    const selectType = (type) => {
        setRecipeType(type);

        if (type === 'todas') {
            setFilteredRecipes(recipes);
        } else {
            const selectedRecipes = recipes.filter( recipe => recipe.tipo === type );
            setFilteredRecipes(selectedRecipes);
        }
    }


    useEffect(() => {
        getRecipes();
    }, [])


    return (
        <div className="recipes">
            <h1>Chef Fácil</h1>
            <select value={recipeType} onChange={(e) => selectType(e.target.value)}>
                <option value="todas">Todas as receitas</option>
                <option value="doce">Doces</option>
                <option value="salgado">Salgadas</option>
                <option value="agridoce">Agridoces</option>
            </select>
            <div className='recipes_container'>

                {
                    !filteredRecipes ? <p>Carregando...</p> : (
                        filteredRecipes.map(recipe => (
                            <div className='recipe' key={recipe.id}>
                                <img src={recipe.link_imagem} alt="Imagem da receita" />
                                <h3>{recipe.receita}</h3>
                                <span>Tipo: {recipe.tipo}</span>
                                <Link to={`recipe/${recipe.id}`} >
                                    <button>Ver receita</button>
                                </Link>
                            </div>
                        ))
                    )
                }

            </div>
        </div>
    )
}

export default Recipes;