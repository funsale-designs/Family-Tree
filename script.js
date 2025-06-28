document.addEventListener('DOMContentLoaded', () => {

    // Define the family data
    // Each person object needs:
    // id: Unique identifier
    // name: Full name
    // gender: 'male', 'female', or null/undefined
    // birthYear: Year of birth (for display)
    // spouseId: ID of spouse (if any)
    // children: An array of IDs of their children
    // bio: Optional short biography or notes

    const familyData = [
        // Generation 1 (Root)
        { id: 'g1-1', name: 'Arthur "Art" Smith', gender: 'male', birthYear: 1900, spouseId: 'g1-2', children: ['g2-1', 'g2-2'], bio: 'Grand patriarch, started the family farm.' },
        { id: 'g1-2', name: 'Eleanor "Ellie" Smith (née Vance)', gender: 'female', birthYear: 1905, spouseId: 'g1-1', children: ['g2-1', 'g2-2'], bio: 'Matriarch, known for her baking.' },

        // Generation 2 (Children of Arthur & Eleanor)
        { id: 'g2-1', name: 'Bernard Smith', gender: 'male', birthYear: 1925, spouseId: 'g2-3', children: ['g3-1'], bio: 'WWII veteran, loved fishing.' },
        { id: 'g2-3', name: 'Clara Smith (née Davis)', gender: 'female', birthYear: 1928, spouseId: 'g2-1', children: ['g3-1'], bio: 'Dedicated homemaker and gardener.' },
        { id: 'g2-2', name: 'Dorothy "Dot" Jones (née Smith)', gender: 'female', birthYear: 1930, spouseId: 'g2-4', children: ['g3-2', 'g3-3'], bio: 'Lived in the city, passionate about art.' },
        { id: 'g2-4', name: 'Edward Jones', gender: 'male', birthYear: 1929, spouseId: 'g2-2', children: ['g3-2', 'g3-3'], bio: 'Engineer, always tinkering.' },

        // Generation 3 (Children of G2)
        { id: 'g3-1', name: 'Fiona Smith', gender: 'female', birthYear: 1950, spouseId: 'g3-4', children: ['g4-1'], bio: 'Local school teacher.' },
        { id: 'g3-4', name: 'George Brown', gender: 'male', birthYear: 1948, spouseId: 'g3-1', children: ['g4-1'], bio: 'Carpenter, built many houses in town.' },

        { id: 'g3-2', name: 'Henry Jones', gender: 'male', birthYear: 1955, spouseId: 'g3-5', children: ['g4-2'], bio: 'Musician, traveled extensively.' },
        { id: 'g3-5', name: 'Irene Jones (née Green)', gender: 'female', birthYear: 1958, spouseId: 'g3-2', children: ['g4-2'], bio: 'Librarian, avid reader.' },

        { id: 'g3-3', name: 'Julia White (née Jones)', gender: 'female', birthYear: 1960, spouseId: 'g3-6', children: ['g4-3', 'g4-4'], bio: 'Ran a small cafe.' },
        { id: 'g3-6', name: 'Kevin White', gender: 'male', birthYear: 1959, spouseId: 'g3-3', children: ['g4-3', 'g4-4'], bio: 'Accountant, very organized.' },

        // Generation 4 (Children of G3)
        { id: 'g4-1', name: 'Liam Smith', gender: 'male', birthYear: 1980, spouseId: 'g4-5', children: ['g5-1'], bio: 'Software developer.' },
        { id: 'g4-5', name: 'Mia Smith (née Patel)', gender: 'female', birthYear: 1982, spouseId: 'g4-1', children: ['g5-1'], bio: 'Architect, designed modern homes.' },

        { id: 'g4-2', name: 'Nora Jones', gender: 'female', birthYear: 1985, spouseId: 'g4-6', children: [], bio: 'Freelance artist.' }, // No children for this branch
        { id: 'g4-6', name: 'Oscar Lee', gender: 'male', birthYear: 1983, spouseId: 'g4-2', children: [], bio: 'Professor of literature.' },

        { id: 'g4-3', name: 'Paige White', gender: 'female', birthYear: 1988, spouseId: 'g4-7', children: ['g5-2'], bio: 'Veterinarian.' },
        { id: 'g4-7', name: 'Quinn Roberts', gender: 'male', birthYear: 1987, spouseId: 'g4-3', children: ['g5-2'], bio: 'Environmental scientist.' },

        { id: 'g4-4', name: 'Ryan White', gender: 'male', birthYear: 1990, spouseId: null, children: [], bio: 'Professional athlete.' }, // No spouse or children yet

        // Generation 5 (Children of G4)
        { id: 'g5-1', name: 'Sophie Smith', gender: 'female', birthYear: 2010, spouseId: null, children: [], bio: 'Currently in high school.' },
        { id: 'g5-2', name: 'Tom Roberts', gender: 'male', birthYear: 2012, spouseId: null, children: [], bio: 'Aspiring gamer.' }
    ];

    // Helper function to get a person by ID
    function getPersonById(id) {
        return familyData.find(person => person.id === id);
    }

    // Recursive function to build the family tree HTML
    function buildTree(personIds) {
        if (!personIds || personIds.length === 0) {
            return ''; // No children, return empty string
        }

        let html = '<ul class="family-list">';
        personIds.forEach(personId => {
            const person = getPersonById(personId);
            if (person) {
                const spouse = person.spouseId ? getPersonById(person.spouseId) : null;
                const genderIconClass = person.gender === 'male' ? 'icon-male' : (person.gender === 'female' ? 'icon-female' : 'icon-unknown');

                html += `
                    <li>
                        <div class="person-card" data-id="${person.id}">
                            <span class="person-icon ${genderIconClass}"></span>
                            <div class="person-details">
                                <strong>${person.name}</strong> (${person.birthYear})
                                ${spouse ? `<br><span>Spouse: ${spouse.name}</span>` : ''}
                                <div class="tooltip">
                                    <strong>${person.name}</strong><br>
                                    Born: ${person.birthYear}<br>
                                    ${person.gender ? `Gender: ${person.gender.charAt(0).toUpperCase() + person.gender.slice(1)}<br>` : ''}
                                    ${spouse ? `Spouse: ${spouse.name}<br>` : ''}
                                    ${person.bio ? `Bio: ${person.bio}` : 'No detailed bio available.'}
                                </div>
                            </div>
                        </div>
                `;

                // Recursively add children if they exist
                if (person.children && person.children.length > 0) {
                    html += buildTree(person.children);
                }

                html += '</li>';
            }
        });
        html += '</ul>';
        return html;
    }

    // Find the root person(s) (those without defined parents in this simple model)
    // For a robust system, you'd explicitly define roots or build parent links.
    // Here, we assume 'g1-1' (Arthur) is the primary root of the displayed tree.
    const rootPersonId = 'g1-1'; // Starting with Arthur Smith
    const rootPerson = getPersonById(rootPersonId);

    if (rootPerson) {
        // Build the initial HTML for the root person
        let initialHtml = `<ul class="family-list"><li>
                                <div class="person-card" data-id="${rootPerson.id}">
                                    <span class="person-icon ${rootPerson.gender === 'male' ? 'icon-male' : (rootPerson.gender === 'female' ? 'icon-female' : 'icon-unknown')}"></span>
                                    <div class="person-details">
                                        <strong>${rootPerson.name}</strong> (${rootPerson.birthYear})
                                        ${rootPerson.spouseId ? `<br><span>Spouse: ${getPersonById(rootPerson.spouseId).name}</span>` : ''}
                                        <div class="tooltip">
                                            <strong>${rootPerson.name}</strong><br>
                                            Born: ${rootPerson.birthYear}<br>
                                            ${rootPerson.gender ? `Gender: ${rootPerson.gender.charAt(0).toUpperCase() + rootPerson.gender.slice(1)}<br>` : ''}
                                            ${rootPerson.spouseId ? `Spouse: ${getPersonById(rootPerson.spouseId).name}<br>` : ''}
                                            ${rootPerson.bio ? `Bio: ${rootPerson.bio}` : 'No detailed bio available.'}
                                        </div>
                                    </div>
                                </div>`;

        // Add children of the root person
        if (rootPerson.children && rootPerson.children.length > 0) {
            initialHtml += buildTree(rootPerson.children);
        }
        initialHtml += '</li></ul>'; // Close the root li and ul

        document.getElementById('familyTreeContainer').innerHTML = initialHtml;
    } else {
        document.getElementById('familyTreeContainer').innerHTML = '<p>Error: Root person not found in data.</p>';
    }

    // Optional: Add click event listeners for more interactivity (e.g., opening a modal)
    // You could replace the tooltip with a modal dialog for richer information.
    // document.querySelectorAll('.person-card').forEach(card => {
    //     card.addEventListener('click', (event) => {
    //         const personId = event.currentTarget.dataset.id;
    //         const person = getPersonById(personId);
    //         if (person) {
    //             alert(`Clicked on ${person.name}. More details would go in a modal!`);
    //             // Here you'd open a modal with person.name, person.birthYear, person.bio, etc.
    //         }
    //     });
    // });
});
