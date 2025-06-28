document.addEventListener('DOMContentLoaded', () => {

    // Define the family data
    // Each person object needs:
    // id: Unique identifier
    // name: Full name
    // gender: 'male', 'female', or null/undefined
    // birthYear: Year of birth (for display)
    // deathYear: Optional year of death
    // spouseId: ID of their spouse (if any)
    // children: An array of IDs of their children (only listed once per couple/parent)
    // bio: Optional short biography or notes

    const familyData = [
        // Generation 1 (Root Couple)
        { id: 'g1-1', name: 'Arthur "Art" Smith', gender: 'male', birthYear: 1900, deathYear: 1975, spouseId: 'g1-2', children: ['g2-1', 'g2-2'], bio: 'Grand patriarch, started the family farm.' },
        { id: 'g1-2', name: 'Eleanor "Ellie" Smith (née Vance)', gender: 'female', birthYear: 1905, deathYear: 1980, spouseId: 'g1-1', children: ['g2-1', 'g2-2'], bio: 'Matriarch, known for her baking.' },

        // Generation 2 (Children of Arthur & Eleanor)
        { id: 'g2-1', name: 'Bernard Smith', gender: 'male', birthYear: 1925, deathYear: 1998, spouseId: 'g2-3', children: ['g3-1'], bio: 'WWII veteran, loved fishing.' },
        { id: 'g2-3', name: 'Clara Smith (née Davis)', gender: 'female', birthYear: 1928, deathYear: 2005, spouseId: 'g2-1', children: ['g3-1'], bio: 'Dedicated homemaker and gardener.' }, // Children also listed for Bernard

        { id: 'g2-2', name: 'Dorothy "Dot" Jones (née Smith)', gender: 'female', birthYear: 1930, deathYear: 2010, spouseId: 'g2-4', children: ['g3-2', 'g3-3'], bio: 'Lived in the city, passionate about art.' },
        { id: 'g2-4', name: 'Edward Jones', gender: 'male', birthYear: 1929, deathYear: 2008, spouseId: 'g2-2', children: ['g3-2', 'g3-3'], bio: 'Engineer, always tinkering.' }, // Children also listed for Dorothy

        // Generation 3 (Children of G2)
        { id: 'g3-1', name: 'Fiona Brown (née Smith)', gender: 'female', birthYear: 1950, spouseId: 'g3-4', children: ['g4-1'], bio: 'Local school teacher.' },
        { id: 'g3-4', name: 'George Brown', gender: 'male', birthYear: 1948, spouseId: 'g3-1', children: ['g4-1'], bio: 'Carpenter, built many houses in town.' },

        { id: 'g3-2', name: 'Henry Jones', gender: 'male', birthYear: 1955, spouseId: 'g3-5', children: ['g4-2'], bio: 'Musician, traveled extensively.' },
        { id: 'g3-5', name: 'Irene Jones (née Green)', gender: 'female', birthYear: 1958, spouseId: 'g3-2', children: ['g4-2'], bio: 'Librarian, avid reader.' },

        { id: 'g3-3', name: 'Julia White (née Jones)', gender: 'female', birthYear: 1960, spouseId: 'g3-6', children: ['g4-3', 'g4-4'], bio: 'Ran a small cafe.' },
        { id: 'g3-6', name: 'Kevin White', gender: 'male', birthYear: 1959, spouseId: 'g3-3', children: ['g4-3', 'g4-4'], bio: 'Accountant, very organized.' },

        // Generation 4 (Children of G3)
        { id: 'g4-1', name: 'Liam Smith', gender: 'male', birthYear: 1980, spouseId: 'g4-5', children: ['g5-1'], bio: 'Software developer.' },
        { id: 'g4-5', name: 'Mia Smith (née Patel)', gender: 'female', birthYear: 1982, spouseId: 'g4-1', children: ['g5-1'], bio: 'Architect, designed modern homes.' },

        { id: 'g4-2', name: 'Nora Lee (née Jones)', gender: 'female', birthYear: 1985, spouseId: 'g4-6', children: [], bio: 'Freelance artist.' },
        { id: 'g4-6', name: 'Oscar Lee', gender: 'male', birthYear: 1983, spouseId: 'g4-2', children: [], bio: 'Professor of literature.' },

        { id: 'g4-3', name: 'Paige Roberts (née White)', gender: 'female', birthYear: 1988, spouseId: 'g4-7', children: ['g5-2'], bio: 'Veterinarian.' },
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

    // Helper function to create a person card HTML
    function createPersonCardHtml(person) {
        if (!person) return ''; // Handle cases where person might be null

        const genderIconClass = person.gender === 'male' ? 'icon-male' : (person.gender === 'female' ? 'icon-female' : 'icon-unknown');
        const deathInfo = person.deathYear ? ` - ${person.deathYear}` : '';

        return `
            <div class="person-card ${person.spouseId ? '' : 'single-parent'}" data-id="${person.id}">
                <span class="person-icon ${genderIconClass}"></span>
                <div class="person-details">
                    <strong>${person.name}</strong>
                    <span>Born: ${person.birthYear}${deathInfo}</span>
                    <div class="tooltip">
                        <strong>${person.name}</strong><br>
                        Born: ${person.birthYear}${deathInfo}<br>
                        ${person.gender ? `Gender: ${person.gender.charAt(0).toUpperCase() + person.gender.slice(1)}<br>` : ''}
                        ${person.bio ? `Bio: ${person.bio}` : 'No detailed bio available.'}
                    </div>
                </div>
            </div>
        `;
    }

    // Recursive function to build the family tree HTML
    function buildTree(personIds) {
        if (!personIds || personIds.length === 0) {
            return ''; // No children, return empty string
        }

        let html = '<ul class="family-list">';
        const processedSpouses = new Set(); // To avoid processing spouse multiple times

        personIds.forEach(personId => {
            if (processedSpouses.has(personId)) {
                return; // Skip if this person has already been processed as a spouse
            }

            const person = getPersonById(personId);
            if (person) {
                let spouse = null;
                if (person.spouseId) {
                    spouse = getPersonById(person.spouseId);
                    if (spouse) {
                        processedSpouses.add(spouse.id); // Mark spouse as processed
                    }
                }

                // A list item represents a "unit" that has children
                // This unit can be a single person or a couple
                html += `<li>`;
                html += `<div class="person-spouse-group">`; // Group for primary person and spouse
                html += createPersonCardHtml(person);
                if (spouse) {
                    html += createPersonCardHtml(spouse);
                }
                html += `</div>`; // Close person-spouse-group

                // Children are listed under the "primary" person of the couple (or the single parent)
                // We'll arbitrarily choose the first person in the `familyData` array if they have children listed,
                // or the one whose `id` is in `personIds`.
                const childrenToDisplay = person.children;

                // Recursively add children if they exist
                if (childrenToDisplay && childrenToDisplay.length > 0) {
                    html += buildTree(childrenToDisplay);
                }

                html += '</li>';
            }
        });
        html += '</ul>';
        return html;
    }

    // Find the primary root person(s) - often the oldest generation
    // For this example, we explicitly start with 'g1-1' (Arthur Smith)
    const rootPersonId = 'g1-1';
    const rootPerson = getPersonById(rootPersonId);

    if (rootPerson) {
        // Build the initial HTML for the root person (or couple)
        let initialHtml = '<ul class="family-list">';
        const rootSpouse = rootPerson.spouseId ? getPersonById(rootPerson.spouseId) : null;

        initialHtml += `<li>`;
        initialHtml += `<div class="person-spouse-group">`;
        initialHtml += createPersonCardHtml(rootPerson);
        if (rootSpouse) {
            initialHtml += createPersonCardHtml(rootSpouse);
        }
        initialHtml += `</div>`; // Close person-spouse-group

        // Add children of the root couple
        if (rootPerson.children && rootPerson.children.length > 0) {
            initialHtml += buildTree(rootPerson.children);
        }
        initialHtml += '</li></ul>'; // Close the root li and ul

        document.getElementById('familyTreeContainer').innerHTML = initialHtml;
    } else {
        document.getElementById('familyTreeContainer').innerHTML = '<p>Error: Root person not found in data. Please check `rootPersonId`.</p>';
    }

    // Optional: Add event listeners if you want click functionality beyond the tooltip
    // document.querySelectorAll('.person-card').forEach(card => {
    //     card.addEventListener('click', (event) => {
    //         const personId = event.currentTarget.dataset.id;
    //         const person = getPersonById(personId);
    //         if (person) {
    //             alert(`Clicked on ${person.name}. More details would go in a modal!`);
    //         }
    //     });
    // });
});
