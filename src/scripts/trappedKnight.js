import p5 from 'p5/lib/p5.min'

const s = p => {

    function make2DArray(cols, rows) {
        const arr = new Array(cols);
        for (const i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    let grid;
    let rows;
    let cols;
    const w = 5;
    const left = false;
    const right = true;
    const up = false;
    const down = false;
    const ii = 60;
    const jj = 60;
    const index = 1;
    const visited = [];

    p5.setup = () => {
        console.log('setup')
        createCanvas(951, 951);
        background(255);
        cols = floor(width / w);
        rows = floor(height / w);
        grid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Cell(i, j, w);
            }
        }

        for (let i = 0; i < 7000; i++)
        {
            grid[ii][jj].number(index);
            index++;

            if (down) {
                jj--;

                if (!(grid[ii - 1][jj].isNumbered()))
                {
                    down = false;
                    left = true;
                }
                continue;
            }

            if (left) {
                ii--;

                if (!(grid[ii][jj + 1].isNumbered()))
                {
                    left = false;
                    up = true;
                }
                continue;
            }

            if (up) {
                jj++;

                if (!(grid[ii + 1][jj].isNumbered()))
                {
                    up = false;
                    right = true;
                }
                continue;
            }

            if (right) {
                ii++;

                if (!(grid[ii][jj - 1].isNumbered()))
                {
                    right = false;
                    down = true;
                }
                continue;
            }

        }
        //This sets up the first point in the sequence (1)
        visited.push(grid[60][60]);
        grid[60][60].hopped(grid[60][60]);
        //If you would like to see what happens if we ignore the first knight entrapment, you can uncomment the bit below
        //grid[70][37].hopped(grid[70][37]);
    }

    p5.draw = () => {
        background(0);

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
             grid[i][j].show();
           }
         }
        //Push the next knight movement
         if (visited.length < 3000)
            visited.push(hop(visited[visited.length - 1]));

    }


    function Cell(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.numbered = false;
        this.num = -1;
        this.hoppedOn = false;
        this.hoppedFrom;


        this.show = () => {
            if (this.hoppedOn) {
                p5.colorMode(HSB);
                const hue = map(this.num, 1, 3000, 1, 255);
                p5.stroke(hue, 204, 100);
                p5.line(this.x, this.y, this.hoppedFrom.x, this.hoppedFrom.y);
            }
        }

        this.number = (n) => {
            this.numbered = true;
            this.num = n;
        }

        this.isNumbered = () => {
            return this.numbered;
        }

        this.hopped = (hopCell) => {
            this.hoppedOn = true;
            this.hoppedFrom = hopCell;
        }
    }

    // Check all the possible knight moves 1 by 1, looking for the smallest
    function hop(hopCell) {
        pCell1 = grid[hopCell.i + 1][hopCell.j + 2];
        pCell2 = grid[hopCell.i + 2][hopCell.j + 1];
        pCell3 = grid[hopCell.i - 1][hopCell.j + 2];
        pCell4 = grid[hopCell.i - 2][hopCell.j + 1];
        pCell5 = grid[hopCell.i - 1][hopCell.j - 2];
        pCell6 = grid[hopCell.i - 2][hopCell.j - 1];
        pCell7 = grid[hopCell.i + 1][hopCell.j - 2];
        pCell8 = grid[hopCell.i + 2][hopCell.j - 1];

        potentialCells = [];

        if (!pCell1.hoppedOn)
            potentialCells.push(pCell1);
        if (!pCell2.hoppedOn)
            potentialCells.push(pCell2);
        if (!pCell3.hoppedOn)
            potentialCells.push(pCell3);
        if (!pCell4.hoppedOn)
            potentialCells.push(pCell4);
        if (!pCell5.hoppedOn)
            potentialCells.push(pCell5);
        if (!pCell6.hoppedOn)
            potentialCells.push(pCell6);
        if (!pCell7.hoppedOn)
            potentialCells.push(pCell7);
        if (!pCell8.hoppedOn)
            potentialCells.push(pCell8);

        if (potentialCells.length == 0)
        {
            p5.noLoop()
            return hopCell
        }

        var min = potentialCells[0].num;

        for (let i = 0; i < potentialCells.length; i++)
        {
            if (potentialCells[i].num < min)
                min = potentialCells[i].num;
        }

        for (let i = 0; i < potentialCells.length; i++)
        {
            if (potentialCells[i].num == min)
            {
                potentialCells[i].hopped(hopCell);
                return potentialCells[i];
            }
        }
    }
}

const sketch = new p5(s);