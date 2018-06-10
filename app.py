from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

app = Flask(__name__)

engine = create_engine("sqlite:///db/belly_button_biodiversity.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)

OTU = Base.classes.otu
samp_meta = Base.classes.samples_metadata
Samples = Base.classes.samples

session = Session(engine)

@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")

@app.route("/names")
def sample_names():
    results = session.query(samp_meta.SAMPLEID).all()
    names = []
    for name in results:
        names.append("BB_" + str(name[0]))  
    return jsonify(names)

@app.route("/otu")
def get_otu_descriptions():
    results = session.query(OTU.lowest_taxonomic_unit_found).all()
    otu_descriptions = []
    i = 0
    while i < len(results):
        otu_descriptions.append(results[i][0])
        i += 1

    return jsonify(otu_descriptions)

@app.route("/metadata/<sample>")
def get_sample_metadata(sample):
    sample = int(sample[3:])
    results = session.query(samp_meta.AGE, samp_meta.BBTYPE, samp_meta.ETHNICITY, samp_meta.GENDER, samp_meta.LOCATION, samp_meta.SAMPLEID).filter(samp_meta.SAMPLEID == sample)
    results_dict = {"AGE": results[0][0], "BBTYPE": results[0][1], "ETHNICITY": results[0][2], "GENDER": results[0][3], "LOCATION": results[0][4], "SAMPLEID": results[0][5]}
    return jsonify(results_dict)

@app.route("/wfreq/<sample>")
def get_washing_freq(sample):
    sample = int(sample[3:])
    results = session.query(samp_meta.WFREQ).filter(samp_meta.SAMPLEID == sample)    
    washing_freq = int(results[0][0])
    return jsonify(washing_freq)
    
@app.route("/samples/<sample>")
def get_sample_values(sample):
    results = session.query(Samples.otu_id, getattr(Samples, sample)).order_by(getattr(Samples, sample).desc())
    otu_ids = []
    sample_values = []

    for item, value in results:
        otu_ids.append(item)
        sample_values.append(value)

    results_dict = {"otu_ids": otu_ids, "sample_values": sample_values}
    return jsonify(results_dict)

if __name__ == '__main__':
    app.run(debug=True)
