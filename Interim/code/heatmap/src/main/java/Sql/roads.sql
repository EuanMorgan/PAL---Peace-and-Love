SELECT osm_id, highway
FROM public.planet_osm_line as lines,
     public.planet_osm_ways as ways
where highway is not null
  and lines.osm_id = ways.id
