export function processData(data) {
  data.forEach(function (d) {
    ;(d.x = +d.x),
      (d.y = +d.y),
      (d.index = +d.index),
      (d.party_id = +d.party_id),
      (d.index = +d.index)
  })

  return data
}
