import React from 'react'

import { Link } from "@reach/router";
import Pet from "./Pet";
import pf from 'petfinder-client';
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";

const petfinder = pf({
    secret: process.env.API_SECRET
});

class Results extends React.Component{

        state = {
            pets : []
        };

    componentDidMount() {
        console.log(petfinder);
        petfinder.pet
            .find({ location: "Seattle, WA", output: "full" })
            .then(data => {
                let pets;
                if (data.petfinder.pets && data.petfinder.pets.pet) {
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet;
                    } else {
                        pets = [data.petfinder.pets.pet];
                    }
                } else {
                    pets = []
                }
                this.setState({
                    pets
                });
            });
    }
    render() {
        return (
            <div>
                <header>
                    <Link to="/">Adopt Me!</Link>
                </header>
                {this.state.pets.map(pet => {
                    let breed;
                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(", ");
                    } else {
                        breed = pet.breeds.breed;
                    }
                    return (
                        <Pet
                            id={pet.id}
                            animal={pet.animal}
                            key={pet.id}
                            name={pet.name}
                            breed={breed}
                            media={pet.media}
                            location={`${pet.contact.city}, ${pet.contact.state}`}
                        />
                    );
                })}
            </div>
        );
    }
}

export default function ResultsWithContext(props) {
    return (
        <Consumer>
            {context => <Results {...props} searchParams={context} />}
        </Consumer>
    );
}