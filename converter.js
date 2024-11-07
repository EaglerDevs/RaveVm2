function convertToPython() {
    // Grab the Java code from the textarea
    var javaCode = document.getElementById('javaCode').value;

    // A super fancy way of converting Java to Python (just kidding)
    var pythonCode = javaCode
        .replace(/System\.out\.println\((.*?)\);/g, 'print($1)') // Just printing stuff, no biggie
        .replace(/public\s+static\s+void\s+main\s*\(String\[\]\s+args\)/g, 'def main():') // Main method? Meh, just a def.
        .replace(/public\s+class\s+\w+/g, '# Class? Yeah, we don\'t care about that in Python.') // Classes are overrated.
        .replace(/private\s+/g, '# Private variables? Pfft, who needs that?') // Private? Nah, just chill.
        .replace(/protected\s+/g, '# Protected... protected from what though?') // Who needs protection, really?
        .replace(/class\s+/g, 'class ') // No fancy transformations needed, just "class"
        .replace(/new\s+/g, '# New object creation? Like, whoa.') // new keyword... so confusing, right?
        .replace(/int\s+/g, 'int ') // Java ints, just like Python's ints... almost.
        .replace(/String\s+/g, 'str ') // Strings are just strings. (lol)
        .replace(/boolean\s+/g, 'bool ') // Java booleans to Python booleans... amazing stuff.
        .replace(/;\s*/g, '') // No semicolons in Python. Like, why bother?
        .replace(/\btrue\b/g, 'True') // "True" in Python is capitalized. Not like Java, obviously.
        .replace(/\bfalse\b/g, 'False') // False in Python. Not that it matters much.
        .replace(/if\s*\((.*?)\)\s*\{/g, 'if $1:') // If statements... you know how they work.
        .replace(/else\s*\{/g, 'else:') // Else. Because Python is simple, right?
        .replace(/for\s*\(.*\)\s*\{/g, 'for i in range():') // For loops... because loops are fun.
        .replace(/while\s*\(.*\)\s*\{/g, 'while:') // While loops... duh.
        .replace(/\breturn\b/g, '# Uhh, returning something? Let\'s just... return it.') // Return? Whatever.
        .replace(/;/g, '') // Semicolons? Nah, they aren’t needed in Python.
        .replace(/\btrue\b/g, 'True') // Java's true is Python's True. #Mindblown
        .replace(/\bfalse\b/g, 'False'); // And false in Java is False in Python. Fancy, huh?

    // Display the converted Python code
    document.getElementById('pythonCode').innerText = pythonCode;
}
