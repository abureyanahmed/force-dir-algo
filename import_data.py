import networkx as nx

#G = nx.Graph()
#G.add_edge(0,1)
#G.add_edge(1,2)
#G.add_edge(2,3)
#G = nx.path_graph(100)
G = nx.grid_graph((6,6))
G = nx.convert_node_labels_to_integers(G)
p = dict(nx.shortest_path_length(G))  # source,target not specified
edge_source = []
edge_target = []

for e in G.edges():
    u, v = e
    edge_source.append(u)
    edge_target.append(v)

node_ids = []

for u in G.nodes():
    node_ids.append(u)

f = open("data.js", "w")
f.write("d="+str(p)+"\n")
f.write("edge_source="+str(edge_source)+"\n")
f.write("edge_target="+str(edge_target)+"\n")
f.write("node_ids="+str(node_ids)+"\n")
f.close()

import json

# Data to be written to a JSON file (a Python dictionary)
data = {
    "d": p,
    "edge_source": edge_source,
    "edge_target": edge_target,
    "node_ids": node_ids
}

# Open a file in write mode ('w') and use json.dump() to write the data
with open('./force_dir_stress/data.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)  # 'indent' is used for pretty printing