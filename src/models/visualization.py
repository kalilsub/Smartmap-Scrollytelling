import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse, FancyArrow
from matplotlib.colors import LinearSegmentedColormap

# Define the colors
pruple_hex = '#0127A4'
blue_hex = '#7696FE'
red_hex = '#DC6025'
orange_hex = '#EAA07D'
neutral_color = '#D9E1E8'

# Create custom colormap
colors = [blue_hex, neutral_color, orange_hex]
n_bins = 10  # Number of bins for levels
cmap_name = 'custom_cmap'
custom_cmap = LinearSegmentedColormap.from_list(cmap_name, colors, N=n_bins)

colormap = mpl.colormaps['viridis']

inches_pt    = 1 / 72.27
beamerwidth_  = 435.24408 * inches_pt
beamerwidth  = 398.3386 * inches_pt
_beamerheight_ = 256.0748 * inches_pt
beamerheight_ = (256.0748 - 40) * inches_pt
beamerheight = (256.0748 - 80) * inches_pt
textwidth    = 347.12354 * inches_pt

plt.rcParams.update({
    "figure.figsize": (beamerwidth, beamerheight),
    "figure.dpi": 300,
    # "text.usetex": True,                
    # "font.family": "sans-serif",
    # 'mathtext.fontset': 'cm',
    # "text.latex.preamble" : r"\usepackage{cmbright}",
    # 'font.sans-serif': ['Computer Modern'],
    # # "text.usetex": False, # <- don't use LaTeX to typeset. It's much slower, and you can't change the font atm.
    # "pgf.texsystem": "pdflatex",
    "axes.labelsize": 7, 
    "font.size": 7,
    "legend.fontsize": 6,
    "xtick.labelsize": 5,
    "ytick.labelsize": 5,
    'lines.linewidth': 1,
    "axes.facecolor":'None',
    'axes.titlesize': 7,
    'axes.titlepad' : 1,    
    'axes.linewidth': 0.5})

partycolors = {'SVP':'#e41a1c','SP':'#377eb8','FDP':'#4daf4a','CVP':'#984ea3',"Grüne":'#ff7f00','EVP':'#ffff33','glp':'#a65628'}

def get_meshgrid(area=(-1,1,-1,1), d=0, r=100):
    # Create a grid of points to evaluate
    x_min, x_max, y_min, y_max = area
    xx, yy = np.meshgrid(np.linspace(x_min - d, x_max + d, r),
                         np.linspace(y_min - d, y_max + d, r))
    return np.c_[xx.ravel(), yy.ravel()]


def figure(ax=None, area=None):
    if not ax and not area:
        fig, ax = plt.subplots(figsize=(textwidth,textwidth))
        return fig, ax, (-1,1,-1,1)
    elif not area:
        area = np.hstack([ax.get_xlim(), ax.get_ylim()]) 
        return ax.figure, ax, area
    else:
        return ax.figure, ax, area

def get_rectangle(N):
    A = int(np.sqrt(N))
    B = int(N/A) + (N%A>0) 
    return A,B

def hexColors(values, colormap=colormap):
    rgb_colors = [colormap(value)[:3] for value in values]  # Extract RGB
    return [mpl.colors.rgb2hex(rgb) for rgb in rgb_colors]

def plotQuestion(question, area=None, ax=None):
    fig, ax, area = figure(ax, area)
    x_min, x_max, y_min, y_max = area

    x1,x2,y1,y2 = question.values
    
    ax.scatter([x1], [y1], c='black', marker='^', s=20, zorder=3 ,label='YAY') # YAY
    ax.scatter([x2], [y2], c='black', marker='v', s=20, zorder=3, label='NAY') # NAY

    # Calculate Midpoint
    mx = (x1 + x2) / 2
    my = (y1 + y2) / 2
    
    # Rotate one point 90 degrees around the midpoint
    rx = mx + (x1 - mx) * 0 - (y1 - my) * 1
    ry = my + (x1 - mx) * 1 + (y1 - my) * 0
    
    # Define the equation of the line passing through midpoint and rotated point
    if rx - mx == 0: # Avoid division by zero, line is vertical
        x_line = np.array([mx, mx])
        y_line = np.array([-1, 1])
    else:
        slope = (ry - my) / (rx - mx)
        intercept = my - slope * mx
        x_line = np.array([x_min, x_max])
        y_line = slope * x_line + intercept
    
    # Draw line between rotated point and midpoint
    ax.plot(x_line, y_line, c='black', linestyle='--', zorder=3, label='Decision Line')

    ax.set(xlim=[x_min,x_max],
           ylim=[y_min,y_max],
           aspect='equal'
           )
    return ax


def plotFeature(predict, q, cmap=plt.cm.coolwarm, d=0, r=100, area=None, ax=None):
    fig, ax, area = figure(ax, area)

    # Create a grid of points to evaluate
    x_min, x_max, y_min, y_max = area
    xx, yy = np.meshgrid(np.linspace(x_min - d, x_max + d, r),
                         np.linspace(y_min - d, y_max + d, r))
    
    # Predict probabilities on the grid
    Z = predict(np.c_[xx.ravel(), yy.ravel()], [str(q)])
    Z = Z.reshape(xx.shape)

    # Plot the decision boundary at 50% probability
    ax.contour(xx, yy, Z, levels=[0.5], colors='black', linestyles='--')

    # Plot heatmap of probability
    contour = ax.contourf(xx, yy, Z, alpha=0.8, cmap=cmap, levels=np.linspace(0, 1, 11),  zorder=1)

    # Create a colorbar with limits from 0 to 1
    colorbar = fig.colorbar(contour, ax=ax)
    colorbar.set_label('Probability')

    ax.set(xlim=[x_min-d,x_max+d],
           ylim=[y_min-d,y_max+d],
           aspect='equal'
           )
    
    return ax
    
def plotObjective(objective, answers, cmap=plt.cm.coolwarm, clabel='Loss', d=0, r=100, area=None, ax=None):
    fig, ax, area = figure(ax, area)

    # Create a grid of points to evaluate
    x_min, x_max, y_min, y_max = area
    xx, yy = np.meshgrid(np.linspace(x_min - d, x_max + d, r),
                         np.linspace(y_min - d, y_max + d, r))

    # Predict probabilities on the grid
    Z = objective(np.c_[xx.ravel(), yy.ravel()], answers)
    Z = Z.reshape(xx.shape)

    # Plot heatmap of probability
    contour = ax.contourf(xx, yy, Z, alpha=0.8, cmap=cmap, zorder=1)

    # Create a colorbar with limits from 0 to 1
    colorbar = fig.colorbar(contour, ax=ax)
    colorbar.set_label(clabel)
    # Set the colorbar to use scientific notation
    colorbar.formatter.set_scientific(True)  # Enable scientific notation
    colorbar.formatter.set_powerlimits((0, 0))  # Optional: adjust the power limits for scientific notation
    colorbar.update_ticks()  # Update the colorbar ticks based on the formatter

    ax.set(xlim=[x_min-d,x_max+d],
           ylim=[y_min-d,y_max+d],
           aspect='equal'
           )
    
    return ax
    
def plotEmbedding(E, n=None, highlight={}, area=None, ax=None, **kwargs):
    fig, ax, area = figure(ax, area)
    
    if n is not None:
        params = {'edgecolor': 'white', 's':7, 'lw':.5, 'zorder':5, 'color':"None", 'label':f"User {n}"}
        params.update(highlight)
        ax.scatter(E.loc[n].iloc[0],E.loc[n].iloc[1], **params)

    params = {'zorder':2, 'edgecolors':'black', 's':3, 'linewidths':0.2}
    params.update(**kwargs)
    ax.scatter(E.iloc[:,0],E.iloc[:,1], **params)
    ax.set(aspect='equal')

    return ax

def extendLegend(ax, labels, colormapper, **kwargs):
    # Extract existing legend handles and labels
    existing_handles, existing_labels = ax.get_legend_handles_labels()
    existing_handles += [mpl.lines.Line2D([], [], color=colormapper(name), marker='o', linestyle='None', label=name) for name in labels]
    existing_labels += list(labels)
    ax.legend(handles=existing_handles, labels=existing_labels, **kwargs)

def plotGaussian(Gaussian, std=1, ax=None, **kwargs):
    fig, ax, area = figure(ax)
    params = {'zorder':2, 'edgecolor':'black', 'facecolor':'none', 'linewidth':1, 'linestyle':'--'}
    params.update(**kwargs)
    mean, width, height, angle = Gaussian.shape(std=std)
    ell = Ellipse(xy=mean, width=width, height=height, angle=angle, **params)
    ax.add_patch(ell)
    return ax

def savefig(fig, save_figures, target, data_name='Smartvote', data_type='Binary', name='TestFigure'): 
    if save_figures:
        fig.savefig(f"../../reports/{target}/figures/{data_name}_{data_type}_{name}.pdf", bbox_inches='tight') 