document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

async function fetchData() {
    try {
        const [users, movies, reviews] = await Promise.all([
            fetch("http://localhost:3334/users").then(response => response.json()),
            fetch("http://localhost:3334/movies").then(response => response.json()),
            fetch("http://localhost:3334/reviews").then(response => response.json())
        ]);

        renderGraph(users, movies, reviews);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

function renderGraph(users, movies, reviews) {
    const nodes = [...users, ...movies];
    const links = reviews.map(review => {
        const user = users.find(user => user.id === review.userId);
        const movie = movies.find(movie => movie.id === review.movieId);
        return { source: user, target: movie, review };
    });

    const width = 600;
    const height = 400;

    const svg = d3.select("#graph")
                  .attr("width", width)
                  .attr("height", height);

    const simulation = d3.forceSimulation(nodes)
                         .force("charge", d3.forceManyBody().strength(-200))
                         .force("center", d3.forceCenter(width / 2, height / 2))
                         .force("link", d3.forceLink(links).id(d => d.id).distance(100))
                         .on("tick", ticked);

    const link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("line")
                    .attr("class", "link")
                    .attr("stroke", "yellow") 
                    .attr("stroke-width", 3)
                    .on("click", showReview); 

    const node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("g")
                    .attr("class", d => "node " + (d.name ? "user" : "movie"))
                    .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
        .attr("r", d => d.name ? 10 : 20) 
        .attr("fill", d => d.name ? "lightgreen" : "orange"); 

    node.filter(d => d.name)
        .append("text")
        .text(d => d.name)
        .attr("dx", 12)
        .attr("dy", 4);

    node.filter(d => !d.name)
        .append("text")
        .text(d => d.title)
        .attr("dx", 12)
        .attr("dy", 4);

    const reviewInfo = d3.select(".review-info")
                         .style("display", "none");

    function ticked() {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    }

    // Função para mostrar o comentário e a avaliação da review ao clicar na linha
    function showReview(event, d) {
        const review = d.review;
        alert(`Avaliação: ${review.rating}\nComentário: ${review.comment}`);
    }

    d3.select("body").on("click", () => {
        reviewInfo.style("display", "none");
    });
}
