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

    const svg = d3.select("body")
        .append("svg")
        .attr("id", "graph")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-800)) // Aumentar a força de repulsão
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("link", d3.forceLink(links).id(d => d.id).distance(200)) // Ajustar a distância entre os nós
        .on("tick", ticked);

    const link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "yellow")
        .attr("stroke-width", 6) // Aumentar a largura dos links
        .on("click", showReview);

    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", d => "node " + (d.name ? "user" : "movie"))
        .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
        .attr("r", d => d.name ? 15 : 30) // Aumentar o tamanho dos nós
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

        const minNodeDistance = 50; // Distância mínima permitida entre os nós

        function ticked() {
            // Verificar a distância entre os nós e aplicar força de repulsão adicional se estiverem muito próximos
            nodes.forEach(node => {
                nodes.forEach(otherNode => {
                    if (node !== otherNode) {
                        const dx = node.x - otherNode.x;
                        const dy = node.y - otherNode.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
        
                        if (distance < minNodeDistance) {
                            const separationForce = 0.1; // Ajuste conforme necessário
                            const angle = Math.atan2(dy, dx);
                            node.vx += separationForce * Math.cos(angle);
                            node.vy += separationForce * Math.sin(angle);
                        }
                    }
                });
            });
        
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
