type Person ={
    readonly id: number,
    readonly name : string,
    birth_year: number,
    death_year?:number,
    biography: string,
    imge: string,
}

type ActressNationality = 
| "American"
| "British"
| "Australian"
| "Israeli-American"
| "South African"
| "French"
| "Indian"
| "Israeli"
| "Spanish"
| "South Korean"
| "Chinese"


type Actress = Person & {
    most_famous_movies: [string,string,string],
    awards: string,
    nationality : ActressNationality
}

function isActress(dati: unknown): dati is Actress{
    return(
        typeof dati === "object" &&dati !== null &&

        "id" in dati && typeof dati.id === "number" &&

        "name" in dati && typeof dati.name ==="string" &&

        "birth_year" in dati && typeof dati.birth_year ==="number" &&

        "death_year" in dati && typeof dati.death_year ==="number" &&

        "biography" in dati && typeof dati.biography ==="string" &&

        "imge" in dati && typeof dati.imge ==="string" &&

        "most_famous_movies" in dati && 
        dati.most_famous_movies instanceof Array && 
        dati.most_famous_movies.length === 3 &&
        dati.most_famous_movies.every (m=> typeof m === "string")&&

        "awards" in dati && typeof dati.awards ==="string" &&

        "nationality" in dati && typeof dati.nationality ==="string" 

    )
}

async function getActress(id:number): Promise <Actress | null> {
    try{
        const response = await fetch(`http://localhost:3333/destinations/${id}`);
        const dati: unknown = await response.json();
        if(!isActress(dati)){
            throw new Error("Formato dei dati non valido");
        }
        return dati;
    }catch(error){
        if (error instanceof Error) {
            console.error("errore durante il recupero dell attrice", error);

        }else{
            console.error("errore sconosciuto", error);
        }
        return null; 
    }
}