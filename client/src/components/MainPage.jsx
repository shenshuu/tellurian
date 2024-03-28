import { Country } from './Country';
import { ArticlesContainer } from './ArticlesContainer';
import { geoPath, select, geoOrthographic, geoGraticule } from 'd3';
import { useState, useEffect, useCallback } from 'react';
import { useData } from '../utils/useData';
import '../styles/MainPage.css';

const initialPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const projection = geoOrthographic()
  .scale(250)
  .translate([300, 300])
  .rotate([10, 10, 10]);

const path = geoPath().projection(projection);

const MainPage = () => {

  const [mousePosition, setMousePosition] = useState(initialPosition);
  const [mouseDown, setMouseDown] = useState(false);
  const [articles, setArticles] = useState([]);
  const data = useData();

  const handleMouseDown = useCallback(_ => {
    setMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(_ => {
    setMouseDown(false);
  }, []);

  const handleMouseMove = useCallback(event => {
    const { clientX, clientY } = event;
    if (mouseDown) {
      const dx = clientX - mousePosition.x;
      const dy = clientY - mousePosition.y;
      const sensitivity = 0.25; // Adjust sensitivity as needed
      const rotation = projection.rotate();
      projection.rotate([
        rotation[0] + dx * sensitivity,
        rotation[1] - dy * sensitivity,
        rotation[2]
      ]);
      setMousePosition({ x: clientX, y: clientY });
    }
  }, [mousePosition, mouseDown]);

  const graticule = geoGraticule();
  useEffect(() => {
    if (data && data.countries) {
      select('#sphere-container')
        .append('path')
        .datum(graticule())
        .attr('d', path)
        .attr('class', 'graticule')
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', 0.5);
    }
  }, [data, path]);

  return data && (
    <div id="main-page-container">
    <svg
        id='content'
        width='100vw'
        height='80vh'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
    >
        <rect width="100%" height="100%" fill="black" />
        <g id='sphere-container'>
        {data.countries.features.map((country, i) => {
            const key = country.properties.name + i
            return <Country setArticles={setArticles} key={key} d={path(country)} 
            country={country} />
        })}
        </g>
    </svg>
    <ArticlesContainer articles={articles} />
    </div>
  );
}

export default MainPage;
